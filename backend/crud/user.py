from sqlalchemy.orm import Session
from backend.models import User
from backend.schemas import UserCreate


def get_user(db: Session, user_id: str):
    return db.query(User).filter(User.user_id == user_id).first()


def create_user(db: Session, user: UserCreate):
    db_user = User(user_id=user.user_id, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
