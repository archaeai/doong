from db.session import engine
from models import *
import pytz




# 모든 테이블 생성
Base.metadata.create_all(bind=engine)
print("All tables created successfully.")

from sqlalchemy.orm import Session
from models import User, CatProfile, Diary, DefaultTask, DailyTaskLog, NonDailyTaskLog
from datetime import date, datetime, timedelta
from core.security import get_password_hash

def create_test_data(db: Session):
    hashed_password = get_password_hash("123123")
    # 사용자 생성
    user1 = User(user_id="tim", password=hashed_password)

    # 고양이 프로필 생성
    cat1 = CatProfile(
        name="둥이",
        breed="코리안쇼트헤어",
        gender="Male",
        birthday=date(2022, 7, 20),
        adopted_day=date(2021, 6, 15),
        neutered=True,
        weight=6.5,
        user=user1
    )

    # 다이어리 생성
    diary1 = Diary(
        date=date(2024, 7, 7),
        mood = "행복",
        activity_level = "높음",
        portion_status = "부족",
        sweet_potato_num = "2",
        sweet_potato_cond =  "정상",
        potato_num =  "2",
        potato_cond =  "정상",
        weight = 6.5,
        abnomal_act = "없음",
        note = "강씨 방문",
        comment = "까칠",
        cat_profile = cat1,
        photo_url = ''
    )
    
    vaccine_task = DefaultTask(
    period_type="Y",  # 연간
    period_int=1,  # 1년 주기
    cat_id=0,  # 고양이 ID, 이 값은 실제 고양이 ID로 대체되어야 합니다.
    note="연간 백신 접종"
)

    # 심장사상충 예방 task
    heartworm_task = DefaultTask(
        period_type="M",  # 월간
        period_int=1,  # 매월
        cat_id=0,  # 고양이 ID, 이 값은 실제 고양이 ID로 대체되어야 합니다.
        note="심장사상충 예방약 투여"
)

    # 기본 작업 생성
    task1 = DefaultTask(
        period_type="D",
        period_int=1,
        cat_id =0,
        note="물"
    )
    task2 = DefaultTask(
        period_type="D",
        period_int=1,
        cat_id =0,
        note="밥"
    )
    task3 = DefaultTask(
        period_type="D",
        period_int=1,
        cat_id =0,
        note="화장실 청소"
    )
    task4 = DefaultTask(
        period_type="D",
        period_int=1,
        cat_id =0,
        note="바닥청소"
    )
    task5 = DefaultTask(
        period_type="D",
        period_int=1,
        cat_id =0,
        note="사냥놀이 15분"
    )
    task6 = DefaultTask(
        period_type="D",
        period_int=1,
        cat_id =0,
        note="빗질"
    )
    task7 = DefaultTask(
        period_type="D",
        period_int=1,
        cat_id =0,
        note="양치"
    )
    task8 = DefaultTask(
        period_type="D",
        period_int=1,
        cat_id =0,
        note="사냥놀이 15분"
    )
    task9 = DefaultTask(
        period_type="W",
        period_int=1,
        cat_id =0,
        note="손톱"
    )
    task10 = DefaultTask(
        period_type="W",
        period_int=1,
        cat_id =0,
        note="모래갈이"
    ) 
    tz = pytz.timezone('Asia/Seoul')
    # 일일 작업 로그 생성
    now = datetime.now(tz=tz)
    daily_task_log1 = DailyTaskLog(
        date=date(now.year, now.month, now.day),
        note=task1.note,
        cat_id=cat1.id,
        done=True,
        default_task=task1,
        cat_profile=cat1
    )
    daily_task_log2 = DailyTaskLog(
        date=date(now.year, now.month, now.day),
        note=task2.note,
        cat_id=cat1.id,
        done=True,
        default_task=task2,
        cat_profile=cat1
    )

    daily_task_log3 = DailyTaskLog(
            date=date(now.year, now.month, now.day),
            note=task3.note,
            cat_id=cat1.id,
            done=True,
            default_task=task3,
            cat_profile=cat1
        )

    daily_task_log4 = DailyTaskLog(
            date=date(now.year, now.month, now.day),
            note=task4.note,
            cat_id=cat1.id,
            done=True,
            default_task=task4,
            cat_profile=cat1
        )

    daily_task_log5 = DailyTaskLog(
            date=date(now.year, now.month, now.day),
            note=task5.note,
            cat_id=cat1.id,
            done=False,
            default_task=task5,
            cat_profile=cat1
        )

    daily_task_log6 = DailyTaskLog(
            date=date(now.year, now.month, now.day),
            note=task6.note,
            cat_id=cat1.id,
            done=False,
            default_task=task6,
            cat_profile=cat1
        )

    daily_task_log7 = DailyTaskLog(
            date=date(now.year, now.month, now.day),
            note=task7.note,
            cat_id=cat1.id,
            done=False,
            default_task=task7,
            cat_profile=cat1
        )

    daily_task_log8 = DailyTaskLog(
            date=date(now.year, now.month, now.day),
            note=task8.note,
            cat_id=cat1.id,
            done=False,
            default_task=task8,
            cat_profile=cat1
        )

    now_after_2w = now + timedelta(weeks=1)
    # 비일상적 작업 로그 생성
    non_daily_task_log1 = NonDailyTaskLog(
        cat_id=cat1.id,
        date=date(now_after_2w.year,now_after_2w.month , now_after_2w.day),
        done=False,
        note=task9.note,
        default_task=task9,
        cat_profile=cat1
    )
    non_daily_task_log2 = NonDailyTaskLog(
        task_id=0,
        date=date(now_after_2w.year,now_after_2w.month , now_after_2w.day -10),
        done=False,
        cat_id=cat1.id,
        note=task10.note,
        cat_profile=cat1
    )
    non_daily_task_log2 = NonDailyTaskLog(
        task_id=0,
        date=date(now_after_2w.year,now_after_2w.month , now_after_2w.day -17),
        done=True,
        cat_id=cat1.id,
        note=task10.note,
        cat_profile=cat1
    )

    # 데이터베이스에 추가
    db.add_all([user1, cat1, diary1, vaccine_task, heartworm_task, task1, task2, task3,task4,task5,task6,task7,task8,task10,daily_task_log1, daily_task_log2, daily_task_log3, daily_task_log4, daily_task_log5, daily_task_log6, daily_task_log7,daily_task_log8,non_daily_task_log1, non_daily_task_log2])
    db.commit()

# 세션 생성 및 테스트 데이터 생성 함수 호출
with Session(engine) as session:
    create_test_data(session)
    print("Test data created successfully.")