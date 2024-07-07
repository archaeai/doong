from db.session import engine
from models import *


# 모든 테이블 생성
Base.metadata.create_all(bind=engine)
print("All tables created successfully.")

from sqlalchemy.orm import Session
from models import User, CatProfile, Diary, CatStatus, DefaultTask, DailyTaskLog, NonDailyTaskLog
from datetime import date
from core.security import get_password_hash

def create_test_data(db: Session):
    hashed_password = get_password_hash("123123")
    # 사용자 생성
    user1 = User(user_id="tim", password=hashed_password)

    # 고양이 프로필 생성
    cat1 = CatProfile(
        name="둥이",
        breed="코리안 쇼트헤어",
        gender="Male",
        birthday=date(2022, 7, 20),
        adopted_day=date(2021, 6, 15),
        vaccine_date=date(2021, 6, 15),
        heart_warm_date=date(2021, 6, 15),
        litter_date=date(2021, 6, 15),
        neutered=True,
        weight=6.5,
        user=user1
    )

    # 다이어리 생성
    diary1 = Diary(
        note="Mittens had a great day today!",
        date=date(2024, 7, 7),
        user=user1
    )

    # 고양이 상태 생성
    cat_status1 = CatStatus(
        cat_id=cat1.id,
        diary_id=diary1.id,
        date=date(2024, 7, 7),
        sleep_quality=4,
        stool_condition=3,
        weight=4.6,
        activity_level=5,
        mood=2,
        cat_profile=cat1,
        diary=diary1
    )

    # 기본 작업 생성
    task1 = DefaultTask(
        period_type="일간",
        period_int=1,
        note="Check water bowl"
    )

    # 일일 작업 로그 생성
    daily_task_log1 = DailyTaskLog(
        date=date(2024, 7, 7),
        note="Water bowl filled",
        cat_id=cat1.id,
        done=True,
        default_task=task1,
        cat_profile=cat1
    )

    # 비일상적 작업 로그 생성
    non_daily_task_log1 = NonDailyTaskLog(
        task_id=task1.id,
        cat_id=cat1.id,
        last_done=date(2024, 7, 1),
        next_done=date(2024, 7, 8),
        note="Nail clipping",
        default_task=task1,
        cat_profile=cat1
    )

    # 데이터베이스에 추가
    db.add_all([user1, cat1, diary1, cat_status1, task1, daily_task_log1, non_daily_task_log1])
    db.commit()

# 세션 생성 및 테스트 데이터 생성 함수 호출
with Session(engine) as session:
    create_test_data(session)
    print("Test data created successfully.")