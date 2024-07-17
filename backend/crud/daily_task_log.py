# crud/daily_task_log.py
from datetime import datetime

from sqlalchemy import and_, func
from sqlalchemy.orm import Session, joinedload
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from backend.models import DailyTaskLog, DefaultTask
from backend.schemas import DailyTaskLogCreate, DailyTaskLogUpdate


def get_daily_task_log(db: Session, daily_task_log_id: int) -> Optional[DailyTaskLog]:
    return db.query(DailyTaskLog).filter(DailyTaskLog.id == daily_task_log_id).first()


def get_daily_task_logs(db: Session, skip: int = 0, limit: int = 10) -> List[DailyTaskLog]:
    return db.query(DailyTaskLog).offset(skip).limit(limit).all()


def get_daily_task_logs_by_cat(db: Session, cat_id: int, skip: int = 0, limit: int = 10) -> List[DailyTaskLog]:
    return db.query(DailyTaskLog).options(joinedload(DailyTaskLog.default_task)).filter(DailyTaskLog.cat_id == cat_id).offset(skip).limit(limit).all()


def get_daily_task_logs_by_cat_and_date(db: Session, cat_id: int, date: str) -> List[DailyTaskLog]:
    target_date = datetime.strptime(date, "%Y-%m-%d").date()
    return db.query(DailyTaskLog).options(joinedload(DailyTaskLog.default_task)).filter(
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
    max_id = db.query(func.max(DefaultTask.id)).filter(DefaultTask.cat_id == 0).scalar()
    if max_id and max_id >= daily_task_log_id and daily_task_log_id >0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="기본업무는 삭제할 수 없습니다.")
    if db_daily_task_log:
        db.delete(db_daily_task_log)
        db.commit()
    return db_daily_task_log
