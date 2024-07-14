# api/default_task.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.crud import default_task as crud_default_task
from backend.schemas import DefaultTaskCreate, DefaultTaskUpdate, DefaultTaskResponse
from backend.api.deps import get_db, get_current_user

router = APIRouter()

@router.get("/", response_model=List[DefaultTaskResponse])
async def read_default_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    default_tasks = crud_default_task.get_default_tasks(db, skip=skip, limit=limit)
    return default_tasks

@router.get("/{default_task_id}", response_model=DefaultTaskResponse)
async def read_default_task(default_task_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    default_task = crud_default_task.get_default_task(db, default_task_id=default_task_id)
    if not default_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Default task not found")
    return default_task

@router.post("/", response_model=DefaultTaskResponse, status_code=status.HTTP_201_CREATED)
async def create_default_task(default_task: DefaultTaskCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud_default_task.create_default_task(db=db, default_task=default_task)

@router.put("/{default_task_id}", response_model=DefaultTaskResponse)
async def update_default_task(default_task_id: int, default_task: DefaultTaskUpdate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    updated_default_task = crud_default_task.update_default_task(db=db, default_task_id=default_task_id, default_task=default_task)
    if not updated_default_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Default task not found")
    return updated_default_task

@router.delete("/{default_task_id}", response_model=DefaultTaskResponse)
async def delete_default_task(default_task_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    deleted_default_task = crud_default_task.delete_default_task(db=db, default_task_id=default_task_id)
    if default_task_id <=8:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="시스템이 등록한 기본 업무는 삭제할 없습니다.")
    if not deleted_default_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Default task not found")
    return deleted_default_task