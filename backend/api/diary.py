# api/cat_profile.py
import os
from shutil import copyfileobj
from typing import List, Optional
from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from backend.crud import diary as crud_diary
from backend.schemas import DiaryCreate, DiaryUpdate, DiaryResponse
from backend.api.deps import get_db, get_current_user

router = APIRouter()

@router.get("/cat/{cat_id}", response_model=List[DiaryResponse], summary="Get diaries by user ID", description="Retrieve a list of diaries for a specific user along with their associated cat statuses.")
async def read_diaries_by_user(cat_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    """
    Get a list of diaries for a specific user with pagination and their associated cat statuses.

    - **user_id**: The ID of the user whose diaries to retrieve.
    - **skip**: Number of records to skip.
    - **limit**: Maximum number of records to return.
    """
    diaries = crud_diary.get_diaries_by_user(db, cat_id = cat_id, skip=skip, limit=limit)
    return diaries


@router.get("/cat/{cat_id}/date/{date}", response_model=List[DiaryResponse], summary="Get diaries by cat_id and date", description="Retrieve a list of diaries for a specific user on a specific date along with their associated cat statuses.")
async def read_diaries_by_user_and_date(cat_id: int, date: str, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    """
    Get a list of diaries for a specific user on a specific date.

    - **user_id**: The ID of the user whose diaries to retrieve.
    - **date**: The date of the diaries to retrieve (format: YYYY-MM-DD).
    """
    diaries = crud_diary.get_diaries_by_user_and_date(db, cat_id=cat_id, date=date)
    return diaries


@router.post("/", response_model=DiaryResponse, status_code=status.HTTP_201_CREATED)
async def create_diary(
    date: str = Form(...),
    cat_id: int = Form(...),
    mood: Optional[str] = Form(None),
    activity_level: Optional[str] = Form(None),
    portion_status: Optional[str] = Form(None),
    sweet_potato_num: Optional[str] = Form(None),
    sweet_potato_cond: Optional[str] = Form(None),
    potato_num: Optional[str] = Form(None),
    potato_cond: Optional[str] = Form(None),
    weight: Optional[float] = Form(None),
    abnomal_act: Optional[str] = Form(None),
    abnomal_detail: Optional[str] = Form(None),
    note: Optional[str] = Form(None),
    comment: Optional[str] = Form(None),
    photo: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    UPLOAD_DIR = f"uploads/diaries/{current_user}/"
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)

    photo_url = None
    if photo:
        filename = f"{uuid4()}.{photo.filename.split('.')[-1]}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "wb") as buffer:
            copyfileobj(photo.file, buffer)
        photo_url = file_path

    diary_data = {
        "date": date,
        "cat_id": cat_id,
        "mood": mood,
        "activity_level": activity_level,
        "portion_status": portion_status,
        "sweet_potato_num": sweet_potato_num,
        "sweet_potato_cond": sweet_potato_cond,
        "potato_num": potato_num,
        "potato_cond": potato_cond,
        "weight": weight,
        "abnomal_act": abnomal_act,
        "abnomal_detail": abnomal_detail,
        "note": note,
        "comment": comment,
        "photo_url": photo_url
    }

    diary = DiaryCreate(**diary_data)
    return crud_diary.create_diary(db=db, diary=diary)


@router.put("/{diary_id}", response_model=DiaryResponse)
async def update_diary(
    diary_id: int,
    date: Optional[str] = Form(None),
    mood: Optional[str] = Form(None),
    activity_level: Optional[str] = Form(None),
    portion_status: Optional[str] = Form(None),
    sweet_potato_num: Optional[str] = Form(None),
    sweet_potato_cond: Optional[str] = Form(None),
    potato_num: Optional[str] = Form(None),
    potato_cond: Optional[str] = Form(None),
    weight: Optional[float] = Form(None),
    abnomal_act: Optional[str] = Form(None),
    abnomal_detail: Optional[str] = Form(None),
    note: Optional[str] = Form(None),
    comment: Optional[str] = Form(None),
    photo: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    UPLOAD_DIR = f"uploads/diaries/{current_user}/"
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)

    photo_url = None
    if photo:
        filename = f"{uuid4()}.{photo.filename.split('.')[-1]}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "wb") as buffer:
            copyfileobj(photo.file, buffer)
        photo_url = file_path

    diary_data = {
        "date": date,
        "mood": mood,
        "activity_level": activity_level,
        "portion_status": portion_status,
        "sweet_potato_num": sweet_potato_num,
        "sweet_potato_cond": sweet_potato_cond,
        "potato_num": potato_num,
        "potato_cond": potato_cond,
        "weight": weight,
        "abnomal_act": abnomal_act,
        "abnomal_detail": abnomal_detail,
        "note": note,
        "comment": comment,
        "photo_url": photo_url
    }

    # Filter out None values
    diary_data = {k: v for k, v in diary_data.items() if v is not None}

    updated_diary = crud_diary.update_diary(db=db, diary_id=diary_id, diary_data=diary_data)
    if not updated_diary:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Diary not found")
    return updated_diary


@router.delete("/{diary_id}", response_model=DiaryResponse)
async def delete_diary(diary_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    deleted_diary = crud_diary.delete_diary(db=db, diary_id=diary_id)
    if not deleted_diary:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Diary not found")
    return deleted_diary