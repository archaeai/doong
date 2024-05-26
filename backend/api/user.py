from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.core.config import settings
from backend.core.security import verify_password, create_access_token
from backend.schemas import UserCreate, UserResponse, Token
from backend.crud import user as crud_user
from backend.api.deps import get_db, get_current_user

router = APIRouter()


@router.post("/signup", response_model=UserResponse)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud_user.get_user(db, user.user_id)
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")
    return crud_user.create_user(db, user)


@router.post("/signin", response_model=Token)
async def signin(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud_user.get_user(db, user.user_id)
    if db_user is None or not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password"
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.user_id}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me", response_model=UserResponse)
async def read_users_me(current_user: str = Depends(get_current_user)):
    return {"user_id": current_user}
