from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime
    last_login: datetime

    class Config:
        orm_mode = True

class ConversationCreate(BaseModel):
    name: str

class MessageCreate(BaseModel):
    content: str
    conversation_id: int
