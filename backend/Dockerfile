FROM python:3.11-slim

# Update system and install necessary packages
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    pkg-config \
    libhdf5-dev \
    libgl1-mesa-glx \
    libglib2.0-0 \ 
    && rm -rf /var/lib/apt/lists/*

WORKDIR /backend

COPY requirements.txt requirements.txt

# Install Python dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Command to run the application
CMD ["sh", "-c", "python check_db_init.py && uvicorn main:app --host 0.0.0.0 --port 8000 --limit-max-requests 52428800"]