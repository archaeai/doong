from sqlalchemy.orm import Session
from backend.models import User
from backend.schemas import UserCreate
from backend.core.security import get_password_hash


def get_user(db: Session, user_id: str):
    return db.query(User).filter(User.user_id == user_id).first()


def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(user_id=user.user_id, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
