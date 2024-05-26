import os
import sys

parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# 이제 `sys.path`에 부모 디렉토리를 추가합니다.
sys.path.append(parent_dir)


from fastapi import FastAPI
from backend.api.router import api_router


app = FastAPI()
app.include_router(api_router)
