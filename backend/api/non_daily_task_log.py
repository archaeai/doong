# api/non_daily_task_log.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.crud import non_daily_task_log as crud_non_daily_task_log
from backend.schemas import NonDailyTaskLogCreate, NonDailyTaskLogUpdate, NonDailyTaskLogResponse
from backend.api.deps import get_db, get_current_user

router = APIRouter()


@router.get("/cat/{cat_id}", response_model=List[NonDailyTaskLogResponse], summary="Get non-daily task logs by cat ID",
            description="Retrieve a list of non-daily task logs for a specific cat.")
async def read_non_daily_task_logs_by_cat(cat_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db),
                                          current_user: str = Depends(get_current_user)):
    return crud_non_daily_task_log.get_non_daily_task_logs_by_cat(db, cat_id=cat_id, skip=skip, limit=limit)

@router.get("/cat/{cat_id}/date/{date}", response_model=List[NonDailyTaskLogResponse],
            summary="Get non daily task logs by cat ID and date",
            description="Retrieve a list of daily task logs for a specific cat on a specific date.")
async def read_non_daily_task_logs_by_cat_and_date(cat_id: int, date: str, db: Session = Depends(get_db),
                                               current_user: str = Depends(get_current_user)):
    return crud_non_daily_task_log.get_daily_task_logs_by_cat_and_date(db, cat_id=cat_id, date=date)


@router.post("/", response_model=NonDailyTaskLogResponse, status_code=status.HTTP_201_CREATED,
             summary="Create a new non-daily task log",
             description="Create a new non-daily task log with the given information.")
async def create_non_daily_task_log(non_daily_task_log: NonDailyTaskLogCreate, db: Session = Depends(get_db),
                                    current_user: str = Depends(get_current_user)):
    return crud_non_daily_task_log.create_non_daily_task_log(db=db, non_daily_task_log=non_daily_task_log)


@router.put("/{non_daily_task_log_id}", response_model=NonDailyTaskLogResponse, summary="Update a non-daily task log",
            description="Update the information of an existing non-daily task log.")
async def update_non_daily_task_log(non_daily_task_log_id: int, non_daily_task_log: NonDailyTaskLogUpdate,
                                    db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    updated_non_daily_task_log = crud_non_daily_task_log.update_non_daily_task_log(db=db,
                                                                                   non_daily_task_log_id=non_daily_task_log_id,
                                                                                   non_daily_task_log=non_daily_task_log)
    if not updated_non_daily_task_log:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Non-daily task log not found")
    return updated_non_daily_task_log


@router.delete("/{non_daily_task_log_id}", response_model=NonDailyTaskLogResponse,
               summary="Delete a non-daily task log", description="Delete an existing non-daily task log by its ID.")
async def delete_non_daily_task_log(non_daily_task_log_id: int, db: Session = Depends(get_db),
                                    current_user: str = Depends(get_current_user)):
    deleted_non_daily_task_log = crud_non_daily_task_log.delete_non_daily_task_log(db=db,
                                                                                   non_daily_task_log_id=non_daily_task_log_id)
    if not deleted_non_daily_task_log:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Non-daily task log not found")
    return deleted_non_daily_task_log
