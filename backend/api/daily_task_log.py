# api/daily_task_log.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.crud import daily_task_log as crud_daily_task_log
from backend.schemas import DailyTaskLogCreate, DailyTaskLogUpdate, DailyTaskLogResponse
from backend.api.deps import get_db, get_current_user

router = APIRouter()

@router.get("/cat/{cat_id}", response_model=List[DailyTaskLogResponse], summary="Get daily task logs by cat ID",
            description="Retrieve a list of daily task logs for a specific cat.")
async def read_daily_task_logs_by_cat(cat_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db),
                                      current_user: str = Depends(get_current_user)):
    return crud_daily_task_log.get_daily_task_logs_by_cat(db, cat_id=cat_id, skip=skip, limit=limit)


@router.get("/cat/{cat_id}/date/{date}", response_model=List[DailyTaskLogResponse],
            summary="Get daily task logs by cat ID and date",
            description="Retrieve a list of daily task logs for a specific cat on a specific date.")
async def read_daily_task_logs_by_cat_and_date(cat_id: int, date: str, db: Session = Depends(get_db),
                                               current_user: str = Depends(get_current_user)):
    return crud_daily_task_log.get_daily_task_logs_by_cat_and_date(db, cat_id=cat_id, date=date)


@router.post("/", response_model=DailyTaskLogResponse, status_code=status.HTTP_201_CREATED,
             summary="Create a new daily task log",
             description="Create a new daily task log with the given information.")
async def create_daily_task_log(daily_task_log: DailyTaskLogCreate, db: Session = Depends(get_db),
                                current_user: str = Depends(get_current_user)):
    return crud_daily_task_log.create_daily_task_log(db=db, daily_task_log=daily_task_log)


@router.put("/{daily_task_log_id}", response_model=DailyTaskLogResponse, summary="Update a daily task log",
            description="Update the information of an existing daily task log.")
async def update_daily_task_log(daily_task_log_id: int, daily_task_log: DailyTaskLogUpdate,
                                db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    updated_daily_task_log = crud_daily_task_log.update_daily_task_log(db=db, daily_task_log_id=daily_task_log_id,
                                                                       daily_task_log=daily_task_log)
    if not updated_daily_task_log:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Daily task log not found")
    return updated_daily_task_log


@router.delete("/{daily_task_log_id}", response_model=DailyTaskLogResponse, summary="Delete a daily task log",
               description="Delete an existing daily task log by its ID.")
async def delete_daily_task_log(daily_task_log_id: int, db: Session = Depends(get_db),
                                current_user: str = Depends(get_current_user)):
    deleted_daily_task_log = crud_daily_task_log.delete_daily_task_log(db=db, daily_task_log_id=daily_task_log_id)
    if not deleted_daily_task_log:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Daily task log not found")
    return deleted_daily_task_log
