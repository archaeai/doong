from datetime import date
from pydantic import BaseModel, Field
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


class CatProfileBase(BaseModel):
    name: str
    breed: str
    gender: str
    birthday: Optional[date]
    adopted_day: Optional[date]
    vaccine_date: Optional[date]
    heart_warm_date: Optional[date]
    litter_date: Optional[date]
    neutered: Optional[bool]
    weight: Optional[float]
    photo_url: Optional[str]
    user_id: str


class CatProfileCreate(CatProfileBase):
    pass


class CatProfileUpdate(CatProfileBase):
    pass


class CatProfileResponse(CatProfileBase):
    id: int

    class Config:
        from_attributes = True



class DiaryBase(BaseModel):
    date: date
    mood: Optional[str] = None
    activity_level: Optional[str] = None
    portion_status: Optional[str] = None
    sweet_potato_num: Optional[str] = None
    sweet_potato_cond: Optional[str] = None
    potato_num: Optional[str] = None
    potato_cond: Optional[str] = None
    weight: Optional[float] = None
    abnomal_act: Optional[str] = None
    abnomal_detail: Optional[str] = None
    note: Optional[str] = None
    comment: Optional[str] = None
    photo_url : Optional[str] = None

class DiaryCreate(DiaryBase):
    user_id: str
    cat_id: int

class DiaryUpdate(DiaryBase):
    pass

class DiaryResponse(DiaryBase):
    id: int
    user_id: str
    cat_id: int

    class Config:
        from_attributes = True

class DefaultTaskBase(BaseModel):
    period_type: Optional[str]
    period_int: Optional[int]
    cat_id : Optional[int]
    note: str


class DefaultTaskCreate(DefaultTaskBase):
    pass


class DefaultTaskUpdate(DefaultTaskBase):
    pass


class DefaultTaskResponse(DefaultTaskBase):
    id: int

    class Config:
        from_attributes = True


class DailyTaskLogBase(BaseModel):
    task_id: Optional[int]
    date: date
    note: Optional[str]
    cat_id: int
    done: bool


class DailyTaskLogCreate(DailyTaskLogBase):
    pass


class DailyTaskLogUpdate(DailyTaskLogBase):
    pass


class DailyTaskLogResponse(DailyTaskLogBase):
    id: int
    task: Optional[DefaultTaskResponse] = Field(default=None)  # 여기 타입 어노테이션 추가
    class Config:
        from_attributes = True


class NonDailyTaskLogBase(BaseModel):
    task_id: Optional[int]
    cat_id: int
    date: date
    done: bool
    note: Optional[str]


class NonDailyTaskLogCreate(NonDailyTaskLogBase):
    pass


class NonDailyTaskLogUpdate(NonDailyTaskLogBase):
    pass


class NonDailyTaskLogResponse(NonDailyTaskLogBase):
    id: int

    class Config:
        from_attributes = True