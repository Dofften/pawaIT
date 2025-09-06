from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import desc
from database import models, database
from database.schemas import UserCreate, UserResponse, ConversationCreate, MessageCreate
import jwt

from utils import ask_ai, create_conversation_name

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Assessment Challenge Backend",
              version="1.0.0",
              description="""A FastAPI backend for pawaIT Full Stack Software Engineer Assessment Challenge Backend""",)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# def get_db():
#     db = database.SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, "hiinisirirandom", algorithms=["HS256"])
        email: str = payload.get("baruapepe")
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"email": email, "user_id": user_id}

def authenticate_user(identifier, password, db: Session):
    user = db.query(models.User).filter((models.User.email == identifier) | (models.User.username == identifier)).first()
    if not user:
        return False
    if not (password == user.password):
        return False
    return user

@app.post("/users", tags=["users"])
def create_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    new_user = models.User(username=form_data.username, password=form_data.password)
    db.add(new_user)
    try:
        db.commit()
        db.refresh(new_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists",
        )
    token = jwt.encode({"baruapepe": new_user.email, "user_id": new_user.id}, "hiinisirirandom", algorithm="HS256")
    return {"access_token": token, "token_type": "bearer", "user": new_user}

@app.post("/login", tags=["users"])
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    token = jwt.encode({"baruapepe": user.email, "user_id": user.id}, "hiinisirirandom", algorithm="HS256")
    return {"access_token": token, "token_type": "bearer", "user": user}


@app.get("/users", tags=["users"])
def get_users(current_user: str = Depends(get_current_user), db: Session = Depends(database.get_db)):
    return db.query(models.User).all()

@app.post("/conversations", tags=["conversations"])
def create_conversation(conversation: ConversationCreate, current_user: dict = Depends(get_current_user), db: Session = Depends(database.get_db)):
    new_conversation = models.Conversation(name=conversation.name, user_id=current_user["user_id"])
    db.add(new_conversation)
    try:
        db.commit()
        db.refresh(new_conversation)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Conversation name already exists | Something went wrong",
        )
    return new_conversation

@app.get("/conversations", tags=["conversations"])
def get_conversations(current_user: dict = Depends(get_current_user), db: Session = Depends(database.get_db)):
    return db.query(models.Conversation).filter(models.Conversation.user_id == current_user["user_id"]).order_by(desc(models.Conversation.id)).all()

@app.post("/messages", tags=["messages"])
def create_message(message: MessageCreate, current_user: dict = Depends(get_current_user), db: Session = Depends(database.get_db)):
    if message.conversation_id is None:
        conversation = None
    else:
        conversation = db.get(models.Conversation, message.conversation_id)
    if conversation is None:
        try:
            conversation_name = create_conversation_name(message.content)
            conversation = models.Conversation(id=message.conversation_id, name=conversation_name, user_id=current_user["user_id"])
            db.add(conversation)
            db.commit()
            db.refresh(conversation)
        except Exception as e:
            db.rollback()
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error",
            )
    try:
        message_content = message.content
        history = db.query(models.Message).filter(models.Message.conversation_id == conversation.id).all()
        cleaned_messages = [{"role": msg.role, "parts": msg.parts} for msg in history]
        cleaned_messages.append({"role": "user", "parts": [{"text": message_content}]})
        answer = ask_ai(cleaned_messages)
        new_message = models.Message(role="user", parts=[{"text":message_content}], conversation_id=conversation.id)
        model_response = models.Message(role="model", parts=[{"text":answer}], conversation_id=conversation.id)
        db.add_all([new_message, model_response])
        db.commit()
        db.refresh(new_message)
        db.refresh(model_response)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Conversation no longer exists or payload invalid",
        )
    except Exception as e:
        db.rollback()
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unexpected error while creating messages",
        )
    return {"conversation_id": conversation.id,
            "conversation_name": conversation.name,
            "message": new_message,
            "model_response": model_response}

@app.get("/messages", tags=["messages"])
def get_messages(conversation_id: int, current_user: dict = Depends(get_current_user),  db: Session = Depends(database.get_db)):
    conversation = (db.query(models.Conversation).filter(models.Conversation.id == conversation_id,models.Conversation.user_id == current_user["user_id"]).first())
    if not conversation:
        raise HTTPException(status_code=403, detail="Not authorized to access this conversation")
    return db.query(models.Message).filter(models.Message.conversation_id == conversation_id).all()