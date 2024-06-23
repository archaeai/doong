# crud/default_task.py
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.models import DefaultTask
from backend.schemas import DefaultTaskCreate, DefaultTaskUpdate

def get_default_task(db: Session, default_task_id: int) -> Optional[DefaultTask]:
    return db.query(DefaultTask).filter(DefaultTask.id == default_task_id).first()

def get_default_tasks(db: Session, skip: int = 0, limit: int = 10) -> List[DefaultTask]:
    return db.query(DefaultTask).offset(skip).limit(limit).all()

def create_default_task(db: Session, default_task: DefaultTaskCreate) -> DefaultTask:
    db_default_task = DefaultTask(**default_task.dict())
    db.add(db_default_task)
    db.commit()
    db.refresh(db_default_task)
    return db_default_task

def update_default_task(db: Session, default_task_id: int, default_task: DefaultTaskUpdate) -> Optional[DefaultTask]:
    db_default_task = db.query(DefaultTask).filter(DefaultTask.id == default_task_id).first()
    if db_default_task:
        for key, value in default_task.dict(exclude_unset=True).items():
            setattr(db_default_task, key, value)
        db.commit()
        db.refresh(db_default_task)
    return db_default_task

def delete_default_task(db: Session, default_task_id: int) -> Optional[DefaultTask]:
    db_default_task = db.query(DefaultTask).filter(DefaultTask.id == default_task_id).first()
    if db_default_task:
        db.delete(db_default_task)
        db.commit()
    return db_default_task