# crud/cat_profile.py
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.models import CatProfile
from backend.schemas import CatProfileCreate, CatProfileUpdate


def get_cat_profile(db: Session, cat_profile_id: int) -> Optional[CatProfile]:
    return db.query(CatProfile).filter(CatProfile.id == cat_profile_id).first()


def get_cat_profiles(db: Session) -> List[CatProfile]:
    return db.query(CatProfile).all()


def get_cat_profiles_by_user(db: Session, user_id : str) -> List[CatProfile]:
    return db.query(CatProfile).filter(CatProfile.user_id == user_id).all()


def create_cat_profile(db: Session, cat_profile: CatProfileCreate) -> CatProfile:
    db_cat_profile = CatProfile(**cat_profile.dict())
    db.add(db_cat_profile)
    db.commit()
    db.refresh(db_cat_profile)
    return db_cat_profile


def update_cat_profile(db: Session, cat_profile_id: int, cat_profile: CatProfileUpdate) -> Optional[CatProfile]:
    db_cat_profile = db.query(CatProfile).filter(CatProfile.id == cat_profile_id).first()
    if db_cat_profile:
        for key, value in cat_profile.dict(exclude_unset=True).items():
            setattr(db_cat_profile, key, value)
        db.commit()
        db.refresh(db_cat_profile)
    return db_cat_profile


def delete_cat_profile(db: Session, cat_profile_id: int) -> Optional[CatProfile]:
    db_cat_profile = db.query(CatProfile).filter(CatProfile.id == cat_profile_id).first()
    if db_cat_profile:
        db.delete(db_cat_profile)
        db.commit()
    return db_cat_profile