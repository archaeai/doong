import os
from sqlalchemy import create_engine, inspect
from sqlalchemy.exc import OperationalError

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

def is_database_initialized(engine):
    inspector = inspect(engine)
    # 확인할 기본 테이블 이름을 입력
    return "user" in inspector.get_table_names()

def main():
    engine = create_engine(DATABASE_URL)
    try:
        if not is_database_initialized(engine):
            print("Database is not initialized. Initializing...")
            os.system("python init_db.py")
        else:
            print("Database is already initialized.")
    except OperationalError as e:
        print(f"Database connection error: {e}")
        print("Initializing database...")
        os.system("python init_db.py")

if __name__ == "__main__":
    main()