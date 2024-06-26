# crud/diary.py
from datetime import datetime

from sqlalchemy import and_
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from backend.models import Diary
from backend.schemas import DiaryCreate, DiaryUpdate


def get_diary(db: Session, diary_id: int) -> Optional[Diary]:
    return  db.query(Diary).options(joinedload(Diary.cat_statuses)).filter(Diary.id == diary_id).first()


def get_diaries(db: Session, skip: int = 0, limit: int = 10) -> List[Diary]:
    return db.query(Diary).offset(skip).limit(limit).all()


def get_diaries_by_user(db: Session, user_id: str, skip: int = 0, limit: int = 10) -> List[Diary]:
    return db.query(Diary).options(joinedload(Diary.cat_statuses)).filter(Diary.user_id == user_id).offset(skip).limit(limit).all()


def get_diaries_by_user_and_date(db: Session, user_id: str, date: str) -> List[Diary]:
    return db.query(Diary).options(joinedload(Diary.cat_statuses)).filter(and_(Diary.user_id == user_id,Diary.date == date)).all()


def create_diary(db: Session, diary: DiaryCreate) -> Diary:
    diary_data = diary.dict()
    # 날짜를 "YYYY-MM-DD" 형식으로 변환
    if diary_data["date"]:
        diary_data["date"] = datetime.strptime(diary_data["date"], "%Y-%m-%d").date()
    db_diary = Diary(**diary_data)
    db.add(db_diary)
    db.commit()
    db.refresh(db_diary)
    return db_diary


def update_diary(db: Session, diary_id: int, diary: DiaryUpdate) -> Optional[Diary]:
    db_diary = db.query(Diary).filter(Diary.id == diary_id).first()
    if db_diary:
        for key, value in diary.dict(exclude_unset=True).items():
            setattr(db_diary, key, value)
        db.commit()
        db.refresh(db_diary)
    return db_diary


def delete_diary(db: Session, diary_id: int) -> Optional[Diary]:
    db_diary = db.query(Diary).filter(Diary.id == diary_id).first()
    if db_diary:
        db.delete(db_diary)
        db.commit()
    return db_diary
