Deployment to Cloud Run

```
# Authenticate if not already done
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Build container
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/anoulam-api

# Deploy to Cloud Run
gcloud run deploy anoulam-api \
  --image gcr.io/YOUR_PROJECT_ID/anoulam-api \
  --platform managed \
  --region YOUR_REGION \
  --allow-unauthenticated

```