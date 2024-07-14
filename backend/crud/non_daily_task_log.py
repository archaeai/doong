# crud/non_daily_task_log.py
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

from sqlalchemy import and_
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from backend.models import NonDailyTaskLog, DefaultTask
from backend.schemas import NonDailyTaskLogCreate, NonDailyTaskLogUpdate
import pytz


def get_non_daily_task_log(db: Session, non_daily_task_log_id: int) -> Optional[NonDailyTaskLog]:
    return db.query(NonDailyTaskLog).filter(NonDailyTaskLog.id == non_daily_task_log_id).first()


def get_non_daily_task_logs(db: Session, skip: int = 0, limit: int = 10) -> List[NonDailyTaskLog]:
    return db.query(NonDailyTaskLog).offset(skip).limit(limit).all()


def get_non_daily_task_logs_by_cat(db: Session, cat_id: int, skip: int = 0, limit: int = 10) -> List[NonDailyTaskLog]:
    return db.query(NonDailyTaskLog).filter(NonDailyTaskLog.cat_id == cat_id).offset(skip).limit(limit).all()

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
            if non_daily_task_log.task_id != 0:
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
                        cat_id=default_task.cat_id,
                        default_task=default_task
                    )
                    db.add(new_log)  # 새 로그 추가
        db.commit()
        db.refresh(db_non_daily_task_log)
    return db_non_daily_task_log


def delete_non_daily_task_log(db: Session, non_daily_task_log_id: int) -> Optional[NonDailyTaskLog]:
    db_non_daily_task_log = db.query(NonDailyTaskLog).filter(NonDailyTaskLog.id == non_daily_task_log_id).first()
    if db_non_daily_task_log:
        db.delete(db_non_daily_task_log)
        db.commit()
    return db_non_daily_task_log
