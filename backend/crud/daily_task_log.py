# crud/daily_task_log.py
from datetime import datetime

from sqlalchemy import and_
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.models import DailyTaskLog
from backend.schemas import DailyTaskLogCreate, DailyTaskLogUpdate


def get_daily_task_log(db: Session, daily_task_log_id: int) -> Optional[DailyTaskLog]:
    return db.query(DailyTaskLog).filter(DailyTaskLog.id == daily_task_log_id).first()


def get_daily_task_logs(db: Session, skip: int = 0, limit: int = 10) -> List[DailyTaskLog]:
    return db.query(DailyTaskLog).offset(skip).limit(limit).all()


def get_daily_task_logs_by_cat(db: Session, cat_id: int, skip: int = 0, limit: int = 10) -> List[DailyTaskLog]:
    return db.query(DailyTaskLog).filter(DailyTaskLog.cat_id == cat_id).offset(skip).limit(limit).all()

def get_daily_task_logs_by_cat_and_date(db: Session, cat_id: int, date: str) -> List[DailyTaskLog]:
    target_date = datetime.strptime(date, "%Y-%m-%d").date()
    return db.query(DailyTaskLog).filter(
        and_(DailyTaskLog.cat_id == cat_id, DailyTaskLog.date == target_date)
    ).all()




def create_daily_task_log(db: Session, daily_task_log: DailyTaskLogCreate) -> DailyTaskLog:
    db_daily_task_log = DailyTaskLog(**daily_task_log.dict())
    db.add(db_daily_task_log)
    db.commit()
    db.refresh(db_daily_task_log)
    return db_daily_task_log


def update_daily_task_log(db: Session, daily_task_log_id: int, daily_task_log: DailyTaskLogUpdate) -> Optional[
    DailyTaskLog]:
    db_daily_task_log = db.query(DailyTaskLog).filter(DailyTaskLog.id == daily_task_log_id).first()
    if db_daily_task_log:
        for key, value in daily_task_log.dict(exclude_unset=True).items():
            setattr(db_daily_task_log, key, value)
        db.commit()
        db.refresh(db_daily_task_log)
    return db_daily_task_log


def delete_daily_task_log(db: Session, daily_task_log_id: int) -> Optional[DailyTaskLog]:
    db_daily_task_log = db.query(DailyTaskLog).filter(DailyTaskLog.id == daily_task_log_id).first()
    if db_daily_task_log:
        db.delete(db_daily_task_log)
        db.commit()
    return db_daily_task_log
