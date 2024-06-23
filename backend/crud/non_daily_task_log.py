# crud/non_daily_task_log.py
from datetime import datetime

from sqlalchemy import and_
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.models import NonDailyTaskLog
from backend.schemas import NonDailyTaskLogCreate, NonDailyTaskLogUpdate


def get_non_daily_task_log(db: Session, non_daily_task_log_id: int) -> Optional[NonDailyTaskLog]:
    return db.query(NonDailyTaskLog).filter(NonDailyTaskLog.id == non_daily_task_log_id).first()


def get_non_daily_task_logs(db: Session, skip: int = 0, limit: int = 10) -> List[NonDailyTaskLog]:
    return db.query(NonDailyTaskLog).offset(skip).limit(limit).all()


def get_non_daily_task_logs_by_cat(db: Session, cat_id: int, skip: int = 0, limit: int = 10) -> List[NonDailyTaskLog]:
    return db.query(NonDailyTaskLog).filter(NonDailyTaskLog.cat_id == cat_id).offset(skip).limit(limit).all()


def create_non_daily_task_log(db: Session, non_daily_task_log: NonDailyTaskLogCreate) -> NonDailyTaskLog:
    db_non_daily_task_log = NonDailyTaskLog(**non_daily_task_log.dict())
    db.add(db_non_daily_task_log)
    db.commit()
    db.refresh(db_non_daily_task_log)
    return db_non_daily_task_log


def update_non_daily_task_log(db: Session, non_daily_task_log_id: int, non_daily_task_log: NonDailyTaskLogUpdate) -> \
Optional[NonDailyTaskLog]:
    db_non_daily_task_log = db.query(NonDailyTaskLog).filter(NonDailyTaskLog.id == non_daily_task_log_id).first()
    if db_non_daily_task_log:
        for key, value in non_daily_task_log.dict(exclude_unset=True).items():
            setattr(db_non_daily_task_log, key, value)
        db.commit()
        db.refresh(db_non_daily_task_log)
    return db_non_daily_task_log


def delete_non_daily_task_log(db: Session, non_daily_task_log_id: int) -> Optional[NonDailyTaskLog]:
    db_non_daily_task_log = db.query(NonDailyTaskLog).filter(NonDailyTaskLog.id == non_daily_task_log_id).first()
    if db_non_daily_task_log:
        db.delete(db_non_daily_task_log)
        db.commit()
    return db_non_daily_task_log
