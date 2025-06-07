FROM python:3.11-slim

WORKDIR /app

COPY apps/python-analytics/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY apps/python-analytics .

EXPOSE 3002

CMD ["python", "main.py"] 