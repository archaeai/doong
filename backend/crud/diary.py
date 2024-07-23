# crud/diary.py
from datetime import datetime, timedelta, date

from sqlalchemy import and_
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from backend.models import Diary, DailyTaskLog
from backend.schemas import DiaryCreate, DiaryUpdate

import os


def get_diaries_by_user(db: Session, cat_id: int, skip: int = 0, limit: int = 10) -> List[Diary]:
    return db.query(Diary).filter(Diary.cat_id == cat_id).offset(skip).limit(limit).all()


def get_diaries_by_user_and_date(db: Session, cat_id: int, date: str) -> List[Diary]:
    return db.query(Diary).filter(and_(Diary.cat_id == cat_id,Diary.date == date)).all()

def get_monthly_diary(db: Session, cat_id: int, year: int, month: int, current_user:str):
    # Generate weight data for the specified month
    # 날짜 범위 계산
    start_date = date(year, month, 1)
    end_date = (start_date + timedelta(days=31)).replace(day=1) - timedelta(days=1)
    # 다이어리 데이터 조회
    diary_entries = db.query(Diary).filter(
        Diary.cat_id == cat_id,
        Diary.date >= start_date,
        Diary.date <= end_date
    ).all()
    
    # 데이터 가공
    weight_data = [{"date": entry.date.isoformat(), "weight": round(entry.weight,2)} for entry in diary_entries if entry.weight is not None]
    poop_data = [{"date": entry.date.isoformat(), "sweet_potato_count": entry.sweet_potato_num} for entry in diary_entries if entry.sweet_potato_num is not None]
    pee_data = [{"date": entry.date.isoformat(), "potato_count": entry.potato_num} for entry in diary_entries if entry.potato_num is not None]
    special_notes = [{"date": entry.date.isoformat(), "note": entry.note} for entry in diary_entries if entry.note is not None]
    photo_urls = [entry.photo_url for entry in diary_entries if entry.photo_url is not None]
    
    daily_tasks = db.query(DailyTaskLog).filter(
            DailyTaskLog.cat_id == cat_id,
            DailyTaskLog.date >= start_date,
            DailyTaskLog.date <= end_date
        ).all()

    # Calculate the completion rate for daily tasks
    total_tasks = len(daily_tasks)
    completed_tasks = sum(1 for task in daily_tasks if task.done)
    # 분모가 0인 경우를 처리하여 오류 방지
    if total_tasks > 0:
        completion_rate = round((completed_tasks / total_tasks) * 100)
    else:
        completion_rate = 0  # 할일 로그가 없는 경우 완료율을 0으로 설정
    diary_skip_days = end_date.day - len(diary_entries)
    
    # Specify overweigh status, butler score, special notes, and comments
    weight_status = "overweight"
    butler_score = round(50 - diary_skip_days * 1.7 + completion_rate/2)

    # Calculate butler rank (assuming the user is in the top 10%)
    butler_rank_percentile = round(100 - (butler_score / 100) * 100, 2)


    return {
        "weight_data": weight_data,
        "poop_data": poop_data,
        "pee_data": pee_data,
        "daily_task_completion_rate": completion_rate,
        "weight_status": weight_status,
        "butler_score": butler_score,
        "butler_rank_percentile": butler_rank_percentile,
        "special_notes": special_notes,
        'diary_skip_days':diary_skip_days,
        "photo_urls": photo_urls
    }

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
