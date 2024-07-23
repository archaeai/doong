# crud/daily_task_log.py
from datetime import datetime

from sqlalchemy import and_, func
from sqlalchemy.orm import Session, joinedload
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from backend.models import DailyTaskLog, DefaultTask
from backend.schemas import DailyTaskLogCreate, DailyTaskLogUpdate

def create_daily_task_logs_if_not_exist(db: Session, cat_id: int):
    today = datetime.today().date()
    # DefaultTask에서 cat_id가 0이고 period_type이 'D'인 태스크 조회
    default_tasks = db.query(DefaultTask).filter(
        and_(DefaultTask.cat_id.in_([0,cat_id]), DefaultTask.period_type == 'D')
    ).all()

    for task in default_tasks:
        # 오늘 날짜의 DailyTaskLog가 있는지 확인
        existing_log = db.query(DailyTaskLog).filter(
            and_(DailyTaskLog.task_id == task.id, DailyTaskLog.cat_id == cat_id, DailyTaskLog.date == today)
        ).first()

        # 없으면 새로운 DailyTaskLog 생성
        if not existing_log:
            new_log = DailyTaskLog(
                task_id=task.id,
                date=today,
                note=task.note,  # DefaultTask의 note를 사용하거나 적절히 조정
                cat_id=task.cat_id,  # 여기서는 DefaultTask의 cat_id가 0이므로, 실제 cat_id를 적절히 설정해야 할 수 있음
                done=False  # 기본값 설정
            )
            db.add(new_log)
    db.commit()  # 변경 사항 저장


def get_daily_task_logs_by_cat(db: Session, cat_id: int, skip: int = 0, limit: int = 10) -> List[DailyTaskLog]:
    create_daily_task_logs_if_not_exist(db, cat_id)
    return db.query(DailyTaskLog).options(joinedload(DailyTaskLog.default_task)).filter(DailyTaskLog.cat_id == cat_id).offset(skip).limit(limit).all()


def get_daily_task_logs_by_cat_and_date(db: Session, cat_id: int, date: str) -> List[DailyTaskLog]:
    create_daily_task_logs_if_not_exist(db, cat_id)
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
