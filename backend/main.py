import os
import sys
from fastapi.middleware.cors import CORSMiddleware

parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# 이제 `sys.path`에 부모 디렉토리를 추가합니다.
sys.path.append(parent_dir)


from fastapi import FastAPI
from backend.api.router import api_router


app = FastAPI(root_path="/api")
app.include_router(api_router)



# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인을 허용하거나 특정 도메인을 지정할 수 있습니다
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메소드 허용 (GET, POST 등)
    allow_headers=["*"],  # 모든 헤더 허용
)
