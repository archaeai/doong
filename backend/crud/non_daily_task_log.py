# crud/non_daily_task_log.py
from datetime import datetime, timedelta, date
from dateutil.relativedelta import relativedelta

from sqlalchemy import and_, func
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from backend.models import NonDailyTaskLog, DefaultTask
from backend.schemas import NonDailyTaskLogCreate, NonDailyTaskLogUpdate
import pytz
from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models import DefaultTask, NonDailyTaskLog  # 모델 임포트 경로는 실제 환경에 맞게 조정해야 합니다.

def add_non_daily_task_logs_if_needed(db: Session, cat_id: int):
    # period_type이 'D'가 아닌 DefaultTask 조회
    default_tasks = db.query(DefaultTask).filter(
        DefaultTask.cat_id == cat_id,
        DefaultTask.period_type != 'D'
    ).all()

    for task in default_tasks:
        # 해당 DefaultTask에 대해 done이 False인 NonDailyTaskLog가 있는지 확인
        existing_log = db.query(NonDailyTaskLog).filter(
            NonDailyTaskLog.task_id == task.id,
            NonDailyTaskLog.done == False
        ).first()

        # 없으면 새로운 NonDailyTaskLog 생성
        if not existing_log:
            # period_type에 따라 날짜 계산
            if task.period_type == 'W':
                next_date = datetime.today() + relativedelta(weeks=+1)
            elif task.period_type == 'M':
                next_date = datetime.today() + relativedelta(months=+1)
            elif task.period_type == 'Y':
                next_date = datetime.today() + relativedelta(years=+1)
            else:
                next_date = datetime.today()  # 기본값, 추가적인 period_type에 대한 처리가 필요할 수 있음

            new_log = NonDailyTaskLog(
                task_id=task.id,
                date=next_date.date(),  # relativedelta 결과를 date 객체로 변환
                done=False  # 기본값 설정
            )
            db.add(new_log)
    db.commit()  # 변경 사항 저장

def get_non_daily_task_log(db: Session, non_daily_task_log_id: int) -> Optional[NonDailyTaskLog]:
    return db.query(NonDailyTaskLog).filter(NonDailyTaskLog.id == non_daily_task_log_id).first()


def get_non_daily_task_logs(db: Session, skip: int = 0, limit: int = 10) -> List[NonDailyTaskLog]:
    return db.query(NonDailyTaskLog).offset(skip).limit(limit).all()


def get_non_daily_task_logs_by_cat(db: Session, cat_id: int) -> List[NonDailyTaskLog]:
    return db.query(NonDailyTaskLog).filter(NonDailyTaskLog.cat_id == cat_id).all()

def get_non_daily_task_logs_by_cat_and_date(db: Session, cat_id: int, date: str) -> List[NonDailyTaskLog]:
    target_date = datetime.strptime(date, "%Y-%m-%d").date()
    return db.query(NonDailyTaskLog).options(joinedload(NonDailyTaskLog.default_task)).filter(
        and_(NonDailyTaskLog.cat_id == cat_id, NonDailyTaskLog.date == target_date)
    ).all()
    


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
        if non_daily_task_log.done and non_daily_task_log.task_id != 0:
            default_task = db.query(DefaultTask).filter(DefaultTask.id == non_daily_task_log.task_id).first()
            if default_task:
                tz = pytz.timezone('Asia/Seoul')
                interval_type = default_task.period_type
                time_diff = None
                if interval_type == 'W':
                    time_diff = timedelta(weeks=default_task.period_int)
                elif interval_type == 'D':
                    time_diff = timedelta(days=default_task.period_int)
                elif interval_type == 'M':
                    time_diff = relativedelta(months=default_task.period_int)
                else :
                    time_diff = relativedelta(years=default_task.period_int)
                new_date = datetime.now(tz) + time_diff
                new_log = NonDailyTaskLog(
                    date=new_date.date(),
                    note=non_daily_task_log.note,
                    done=False,
                    cat_id=non_daily_task_log.cat_id,
                    default_task=default_task
                )
                db.add(new_log)  # 새 로그 추가
        db.commit()
        db.refresh(db_non_daily_task_log)
    return db_non_daily_task_log


def delete_non_daily_task_log(db: Session, non_daily_task_log_id: int) -> Optional[NonDailyTaskLog]:
    db_non_daily_task_log = db.query(NonDailyTaskLog).filter(NonDailyTaskLog.id == non_daily_task_log_id).first()
    max_id = db.query(func.max(DefaultTask.id)).filter(DefaultTask.cat_id == 0).scalar()
    if max_id and max_id >= non_daily_task_log_id and non_daily_task_log_id >0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="기본업무는 삭제할 수 없습니다.")
    if db_non_daily_task_log:
        db.delete(db_non_daily_task_log)
        db.commit()
    return db_non_daily_task_log

def get_upcoming_non_daily_task_logs(db: Session, cat_id: int) -> List[NonDailyTaskLog]:
    seoul_tz = pytz.timezone('Asia/Seoul')
    today_seoul = datetime.now(seoul_tz).date()

    return db.query(NonDailyTaskLog)\
             .filter(and_(NonDailyTaskLog.cat_id == cat_id, 
                          NonDailyTaskLog.date > today_seoul,  # 오늘을 제외하고 필터링
                          NonDailyTaskLog.done == False))\
             .order_by(NonDailyTaskLog.date)\
             .limit(3)\
             .all()

def get_recent_done_non_daily_task_logs(db: Session, cat_id: int) -> List[NonDailyTaskLog]:
    return db.query(NonDailyTaskLog)\
             .filter(NonDailyTaskLog.cat_id == cat_id, NonDailyTaskLog.done == True)\
             .order_by(NonDailyTaskLog.date.desc())\
             .limit(3)\
             .all()