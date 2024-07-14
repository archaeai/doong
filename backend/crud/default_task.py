# crud/default_task.py
from sqlalchemy.orm import Session
from typing import List, Optional
from sqlalchemy.sql import or_
from backend.models import DefaultTask
from backend.schemas import DefaultTaskCreate, DefaultTaskUpdate
from fastapi import APIRouter, Depends, HTTPException, status

def get_default_task(db: Session, default_task_id: int) -> Optional[DefaultTask]:
    return db.query(DefaultTask).filter(DefaultTask.id == default_task_id).first()

def get_default_tasks(db: Session, cat_id: int, skip: int = 0, limit: int = 10) -> List[DefaultTask]:
    # cat_id가 입력된 cat_id이거나 0인 DefaultTask 항목을 조회합니다.
    return db.query(DefaultTask)\
             .filter(or_(DefaultTask.cat_id == cat_id, DefaultTask.cat_id == 0))\
             .offset(skip)\
             .limit(limit)\
             .all()

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
        if db_default_task.cat_id == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="시스템이 등록한 기본 업무는 삭제할 없습니다.")
        db.delete(db_default_task)
        db.commit()
    return db_default_task