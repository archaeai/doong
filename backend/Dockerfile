FROM python:3.11-slim

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["sh", "-c", "python check_db_init.py && uvicorn main:app --host 0.0.0.0 --port 8000"]