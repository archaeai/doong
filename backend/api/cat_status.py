# api/cat_status.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.crud import cat_status as crud_cat_status
from backend.schemas import CatStatusCreate, CatStatusUpdate, CatStatusResponse
from backend.api.deps import get_db, get_current_user

router = APIRouter()


@router.get("/", response_model=List[CatStatusResponse])
async def read_cat_statuses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db),
                            current_user: str = Depends(get_current_user)):
    cat_statuses = crud_cat_status.get_cat_statuses(db, skip=skip, limit=limit)
    return cat_statuses


@router.get("/{cat_status_id}", response_model=CatStatusResponse)
async def read_cat_status(cat_status_id: int, db: Session = Depends(get_db),
                          current_user: str = Depends(get_current_user)):
    cat_status = crud_cat_status.get_cat_status(db, cat_status_id=cat_status_id)
    if not cat_status:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cat status not found")
    return cat_status


@router.get("/cat/{cat_id}/date/{date}", response_model=List[CatStatusResponse], summary="Get cat statuses by cat ID and date", description="Retrieve a list of cat statuses for a specific cat on a specific date.")
async def read_cat_statuses_by_cat_and_date(cat_id: int, date: str, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    cat_statuses = crud_cat_status.get_cat_status_by_cat_and_date(db, cat_id=cat_id, date=date)
    return cat_statuses


@router.get("/cat/{cat_id}", response_model=List[CatStatusResponse], summary="Get cat statuses by cat ID", description="Retrieve a list of cat statuses for a specific cat.")
async def read_cat_statuses_by_cat(cat_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    cat_statuses = crud_cat_status.get_cat_status_by_cat(db, cat_id=cat_id)
    return cat_statuses


@router.post("/", response_model=CatStatusResponse, status_code=status.HTTP_201_CREATED)
async def create_cat_status(cat_status: CatStatusCreate, db: Session = Depends(get_db),
                            current_user: str = Depends(get_current_user)):
    return crud_cat_status.create_cat_status(db=db, cat_status=cat_status)


@router.put("/{cat_status_id}", response_model=CatStatusResponse)
async def update_cat_status(cat_status_id: int, cat_status: CatStatusUpdate, db: Session = Depends(get_db),
                            current_user: str = Depends(get_current_user)):
    updated_cat_status = crud_cat_status.update_cat_status(db=db, cat_status_id=cat_status_id, cat_status=cat_status)
    if not updated_cat_status:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cat status not found")
    return updated_cat_status


@router.delete("/{cat_status_id}", response_model=CatStatusResponse)
async def delete_cat_status(cat_status_id: int, db: Session = Depends(get_db),
                            current_user: str = Depends(get_current_user)):
    deleted_cat_status = crud_cat_status.delete_cat_status(db=db, cat_status_id=cat_status_id)
    if not deleted_cat_status:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cat status not found")
    return deleted_cat_status
