from datetime import datetime

from pydantic import BaseModel
from typing import List, Optional


# Pydantic 모델
class UserBase(BaseModel):
    user_id: str


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    pass


class Token(BaseModel):
    access_token: str
    token_type: str


class CatProfileResponse(BaseModel):
    id: int
    name: str
    birthday: datetime
    weight: float
    photo_url: str
    user_id: str

    class Config:
        from_attributes = True
