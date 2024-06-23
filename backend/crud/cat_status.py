# crud/cat_status.py
from datetime import datetime

from sqlalchemy import and_
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.models import CatStatus
from backend.schemas import CatStatusCreate, CatStatusUpdate

def get_cat_status(db: Session, cat_status_id: int) -> Optional[CatStatus]:
    return db.query(CatStatus).filter(CatStatus.id == cat_status_id).first()


def get_cat_status_by_cat(db: Session, cat_id: int) -> List[CatStatus]:
    return db.query(CatStatus).filter(CatStatus.cat_id == cat_id).all()


def get_cat_status_by_cat_and_date(db: Session, cat_id: int, date: str) -> List[CatStatus]:
    target_date = datetime.strptime(date, "%Y-%m-%d").date()
    return db.query(CatStatus).filter(
        and_(CatStatus.cat_id == cat_id, CatStatus.date == target_date)
    ).all()

def get_cat_statuses(db: Session, skip: int = 0, limit: int = 10) -> List[CatStatus]:
    return db.query(CatStatus).offset(skip).limit(limit).all()

def create_cat_status(db: Session, cat_status: CatStatusCreate) -> CatStatus:
    db_cat_status = CatStatus(**cat_status.dict())
    db.add(db_cat_status)
    db.commit()
    db.refresh(db_cat_status)
    return db_cat_status

def update_cat_status(db: Session, cat_status_id: int, cat_status: CatStatusUpdate) -> Optional[CatStatus]:
    db_cat_status = db.query(CatStatus).filter(CatStatus.id == cat_status_id).first()
    if db_cat_status:
        for key, value in cat_status.dict(exclude_unset=True).items():
            setattr(db_cat_status, key, value)
        db.commit()
        db.refresh(db_cat_status)
    return db_cat_status

def delete_cat_status(db: Session, cat_status_id: int) -> Optional[CatStatus]:
    db_cat_status = db.query(CatStatus).filter(CatStatus.id == cat_status_id).first()
    if db_cat_status:
        db.delete(db_cat_status)
        db.commit()
    return db_cat_status