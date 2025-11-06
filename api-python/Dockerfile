# Use lightweight Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy dependency file and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app files
COPY . .

# Expose port (Cloud Run expects the app to listen on $PORT)
ENV PORT=8080

# Run the FastAPI app
CMD exec uvicorn main:app --host 0.0.0.0 --port $PORT
