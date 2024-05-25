from schemas.database import engine
from schemas.model import *


# 모든 테이블 생성
Base.metadata.create_all(bind=engine)
print("All tables created successfully.")