# api/diary.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.crud import diary as crud_diary
from backend.schemas import DiaryCreate, DiaryUpdate, DiaryResponse
from backend.api.deps import get_db, get_current_user

router = APIRouter()

@router.get("/", response_model=List[DiaryResponse])
async def read_diaries(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    diaries = crud_diary.get_diaries(db, skip=skip, limit=limit)
    return diaries

@router.get("/{diary_id}", response_model=DiaryResponse, summary="Get a diary by ID", description="Retrieve a single diary by its ID along with its associated cat statuses.")
async def read_diary(diary_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    """
    Get a single diary by ID and its associated cat statuses.

    - **diary_id**: The ID of the diary to retrieve.
    """
    diary = crud_diary.get_diary(db, diary_id=diary_id)
    if not diary:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Diary not found")
    return diary


@router.get("/user/{user_id}", response_model=List[DiaryResponse], summary="Get diaries by user ID", description="Retrieve a list of diaries for a specific user along with their associated cat statuses.")
async def read_diaries_by_user(user_id: str, skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    """
    Get a list of diaries for a specific user with pagination and their associated cat statuses.

    - **user_id**: The ID of the user whose diaries to retrieve.
    - **skip**: Number of records to skip.
    - **limit**: Maximum number of records to return.
    """
    diaries = crud_diary.get_diaries_by_user(db, user_id=user_id, skip=skip, limit=limit)
    return diaries


@router.get("/user/{user_id}/date/{date}", response_model=List[DiaryResponse], summary="Get diaries by user ID and date", description="Retrieve a list of diaries for a specific user on a specific date along with their associated cat statuses.")
async def read_diaries_by_user_and_date(user_id: str, date: str, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    """
    Get a list of diaries for a specific user on a specific date.

    - **user_id**: The ID of the user whose diaries to retrieve.
    - **date**: The date of the diaries to retrieve (format: YYYY-MM-DD).
    """
    diaries = crud_diary.get_diaries_by_user_and_date(db, user_id=user_id, date=date)
    return diaries


@router.post("/", response_model=DiaryResponse, status_code=status.HTTP_201_CREATED)
async def create_diary(diary: DiaryCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud_diary.create_diary(db=db, diary=diary)


@router.put("/{diary_id}", response_model=DiaryResponse)
async def update_diary(diary_id: int, diary: DiaryUpdate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    updated_diary = crud_diary.update_diary(db=db, diary_id=diary_id, diary=diary)
    if not updated_diary:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Diary not found")
    return updated_diary


@router.delete("/{diary_id}", response_model=DiaryResponse)
async def delete_diary(diary_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    deleted_diary = crud_diary.delete_diary(db=db, diary_id=diary_id)
    if not deleted_diary:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Diary not found")
    return deleted_diary