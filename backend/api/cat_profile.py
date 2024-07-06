# api/cat_profile.py
import os
from shutil import copyfileobj
from typing import List
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from backend.crud import cat_profile as crud_cat_profile
from backend.schemas import CatProfileCreate, CatProfileUpdate, CatProfileResponse
from backend.api.deps import get_db, get_current_user

router = APIRouter()


@router.get("/", response_model=List[CatProfileResponse])
async def read_cat_profiles(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    cat_profiles = crud_cat_profile.get_cat_profiles(db)
    return cat_profiles


@router.get("/user", response_model=List[CatProfileResponse])
async def read_cat_profiles_by_user(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    cat_profiles = crud_cat_profile.get_cat_profiles_by_user(db, user_id=current_user)
    return cat_profiles


@router.get("/{cat_profile_id}", response_model=CatProfileResponse)
async def read_cat_profile(cat_profile_id: int, db: Session = Depends(get_db),
                           current_user: str = Depends(get_current_user)):
    cat_profile = crud_cat_profile.get_cat_profile(db, cat_profile_id=cat_profile_id)
    if not cat_profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cat profile not found")
    return cat_profile





@router.post("/", response_model=CatProfileResponse, status_code=status.HTTP_201_CREATED,
             summary="Create a new cat profile with an image",
             description="Create a new cat profile with the given information and an optional profile image.")
async def create_cat_profile(
        name: str,
        breed: str,
        gender: str,
        birthday: str,
        adopted_day: str,
        vaccine_date: str,
        heart_warm_date: str,
        litter_date: str,
        neutered: bool,
        weight: float,
        photo: UploadFile = File(None),
        db: Session = Depends(get_db),
        current_user: str = Depends(get_current_user)
):
    UPLOAD_DIR = f"uploads/{current_user}/"

    # Ensure the upload directory exists
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)
    # Save the uploaded file if it exists
    photo_url = None
    if photo:
        filename = f"{uuid4()}.{photo.filename.split('.')[-1]}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "wb") as buffer:
            copyfileobj(photo.file, buffer)
        photo_url = file_path

    cat_profile = CatProfileCreate(
        name=name,
        breed=breed,
        gender=gender,
        birthday=birthday,
        adopted_day=adopted_day,
        vaccine_date=vaccine_date,
        heart_warm_date=heart_warm_date,
        litter_date=litter_date,
        neutered=neutered,
        weight=weight,
        user_id=current_user,
        photo_url=photo_url
    )
    return crud_cat_profile.create_cat_profile(db=db, cat_profile=cat_profile)


@router.put("/{cat_profile_id}", response_model=CatProfileResponse)
async def update_cat_profile(cat_profile_id: int, cat_profile: CatProfileUpdate, db: Session = Depends(get_db),
                             current_user: str = Depends(get_current_user)):
    updated_cat_profile = crud_cat_profile.update_cat_profile(db=db, cat_profile_id=cat_profile_id,
                                                              cat_profile=cat_profile)
    if not updated_cat_profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cat profile not found")
    return updated_cat_profile


@router.delete("/{cat_profile_id}", response_model=CatProfileResponse)
async def delete_cat_profile(cat_profile_id: int, db: Session = Depends(get_db),
                             current_user: str = Depends(get_current_user)):
    deleted_cat_profile = crud_cat_profile.delete_cat_profile(db=db, cat_profile_id=cat_profile_id)
    if not deleted_cat_profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cat profile not found")
    return deleted_cat_profile
