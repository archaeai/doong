import os
import sys

from fastapi import APIRouter
from backend.api import user, cat_profile, diary, cat_status, default_task, daily_task_log, non_daily_task_log

api_router = APIRouter()
api_router.include_router(user.router, prefix="/users", tags=["users"])
api_router.include_router(cat_profile.router, prefix="/cat_profiles", tags=["cat_profiles"])
api_router.include_router(diary.router, prefix="/diary", tags=["diary"])
api_router.include_router(cat_status.router, prefix="/cat_status", tags=["cat_status"])
api_router.include_router(default_task.router, prefix="/default_task", tags=["default_task"])
api_router.include_router(daily_task_log.router, prefix="/daily_task_log", tags=["daily_task_log"])
api_router.include_router(non_daily_task_log.router, prefix="/non_daily_task_log", tags=["non_daily_task_log"])
