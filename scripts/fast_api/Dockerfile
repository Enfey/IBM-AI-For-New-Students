FROM python:3.12

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt &&\
    pip install backports.tarfile

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
