from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: Optional[EmailStr] = None
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
