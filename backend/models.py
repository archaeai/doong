from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean, Date
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'
    user_id = Column(String, primary_key=True, nullable=False)
    password = Column(String, nullable=False, comment='해쉬 암호화해서 저장')
    cat_profiles = relationship('CatProfile', back_populates='user')
    diaries = relationship('Diary', back_populates='user')


class CatProfile(Base):
    __tablename__ = 'cat_profile'
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    birthday = Column(DateTime, nullable=True)
    weight = Column(Float, nullable=True)
    photo_url = Column(String, nullable=True)
    user_id = Column(String, ForeignKey('user.user_id'), nullable=False)
    user = relationship('User', back_populates='cat_profiles')
    cat_statuses = relationship('CatStatus', back_populates='cat_profile')
    daily_task_logs = relationship('DailyTaskLog', back_populates='cat_profile')
    non_daily_task_logs = relationship('NonDailyTaskLog', back_populates='cat_profile')


class Diary(Base):
    __tablename__ = 'diary'
    id = Column(Integer, primary_key=True, nullable=False)
    note = Column(Text, nullable=True)
    date = Column(Date, nullable=True)
    user_id = Column(String, ForeignKey('user.user_id'), nullable=False)
    cat_statuses = relationship('CatStatus', back_populates='diary')
    user = relationship('User', back_populates='diaries')


class CatStatus(Base):
    __tablename__ = 'cat_status'
    id = Column(Integer, primary_key=True, nullable=False)
    cat_id = Column(Integer, ForeignKey('cat_profile.id'), nullable=False)
    diary_id = Column(Integer, ForeignKey('diary.id'), nullable=False)
    date = Column(Date, nullable=True)
    sleep_quality = Column(Integer, nullable=True)
    stool_condition = Column(Integer, nullable=True)
    weight = Column(Float, nullable=True, comment='kg')
    activity_level = Column(Integer, nullable=True)
    mood = Column(Integer, nullable=True, comment='공격성, 소심함 체크')
    cat_profile = relationship('CatProfile', back_populates='cat_statuses')
    diary = relationship('Diary', back_populates='cat_statuses')


class DefaultTask(Base):
    __tablename__ = 'default_task'
    id = Column(Integer, primary_key=True, nullable=False)
    period_type = Column(String, nullable=True, comment='주기 단위')
    period_int = Column(Integer, nullable=True)
    note = Column(Text, nullable=False)
    daily_task_logs = relationship('DailyTaskLog', back_populates='default_task')
    non_daily_task_logs = relationship('NonDailyTaskLog', back_populates='default_task')


class DailyTaskLog(Base):
    __tablename__ = 'daily_task_log'
    id = Column(Integer, primary_key=True, nullable=False)
    task_id = Column(Integer, ForeignKey('default_task.id'), nullable=True)
    date = Column(Date, nullable=False)
    note = Column(Text, nullable=True, comment='새로 추가할 일에는 내용을 입력해야하고, 기존 내장 할일은 note 부부이 자동으로 채워지게 함')
    cat_id = Column(Integer, ForeignKey('cat_profile.id'), nullable=False)
    done = Column(Boolean, nullable=False, default=False, comment='일을 마쳤는지 유무')
    default_task = relationship('DefaultTask', back_populates='daily_task_logs')
    cat_profile = relationship('CatProfile', back_populates='daily_task_logs')


class NonDailyTaskLog(Base):
    __tablename__ = 'non_daily_task_log'
    id = Column(Integer, primary_key=True, nullable=False)
    task_id = Column(Integer, ForeignKey('default_task.id'), nullable=True)
    cat_id = Column(Integer, ForeignKey('cat_profile.id'), nullable=False)
    last_done = Column(Date, nullable=False)
    next_done = Column(Date, nullable=False)
    note = Column(Text, nullable=True)
    default_task = relationship('DefaultTask', back_populates='non_daily_task_logs')
    cat_profile = relationship('CatProfile', back_populates='non_daily_task_logs')