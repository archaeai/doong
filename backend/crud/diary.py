# crud/diary.py
from datetime import datetime

from sqlalchemy import and_
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from backend.models import Diary
from backend.schemas import DiaryCreate, DiaryUpdate


def get_diaries_by_user(db: Session, cat_id: int, skip: int = 0, limit: int = 10) -> List[Diary]:
    return db.query(Diary).filter(Diary.cat_id == cat_id).offset(skip).limit(limit).all()


def get_diaries_by_user_and_date(db: Session, cat_id: int, date: str) -> List[Diary]:
    return db.query(Diary).filter(and_(Diary.cat_id == cat_id,Diary.date == date)).all()


def create_diary(db: Session, diary: DiaryCreate) -> Diary:
    diary_data = diary.dict()
    db_diary = Diary(**diary_data)
    db.add(db_diary)
    db.commit()
    db.refresh(db_diary)
    return db_diary


def update_diary(db: Session, diary_id: int, diary_data: dict):
    db_diary = db.query(Diary).filter(Diary.id == diary_id).first()
    if not db_diary:
        return None

    for key, value in diary_data.items():
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
