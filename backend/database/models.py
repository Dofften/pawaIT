from typing import List
from typing import Optional
from datetime import datetime
from zoneinfo import ZoneInfo
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import String, JSON
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

NAIROBI_TZ = ZoneInfo("Africa/Nairobi")

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(30), unique=True, index=True)
    email: Mapped[Optional[str]] = mapped_column(String(100), unique=True, index=True)
    password: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(NAIROBI_TZ)
    )
    last_login: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(NAIROBI_TZ),
        onupdate=lambda: datetime.now(NAIROBI_TZ)
    )
    conversations: Mapped[List["Conversation"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    def __repr__(self) -> str:
        return f"User(id={self.id!r}, username={self.username!r}, email={self.email!r})"

class Conversation(Base):
    __tablename__ = "conversations"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(NAIROBI_TZ)
    )
    last_updated: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(NAIROBI_TZ),
        onupdate=lambda: datetime.now(NAIROBI_TZ)
    )
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship(back_populates="conversations")
    messages: Mapped[List["Message"]] = relationship(
        back_populates="conversation", cascade="all, delete-orphan", order_by="Message.created_at"
    )
    def __repr__(self) -> str:
        return f"Conversation(id={self.id!r}, name={self.name!r})"

class Message(Base):
    __tablename__ = "messages"
    id: Mapped[int] = mapped_column(primary_key=True)
    parts: Mapped[list] = mapped_column(JSON)
    role: Mapped[str] = mapped_column(String())
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(NAIROBI_TZ)
    )
    conversation_id: Mapped[int] = mapped_column(ForeignKey("conversations.id"))
    conversation: Mapped["Conversation"] = relationship(back_populates="messages")
    def __repr__(self) -> str:
        return f"Message(id={self.id!r}, role={self.role!r}, content={self.content!r})"

class Model(Base):
    __tablename__ = "models"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    description: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(NAIROBI_TZ)
    )
