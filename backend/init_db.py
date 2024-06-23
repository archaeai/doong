from db.session import engine
from models import *


# 모든 테이블 생성
Base.metadata.create_all(bind=engine)
print("All tables created successfully.")