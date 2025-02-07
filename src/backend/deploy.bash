docker build -t weblab-backend:latest .
docker tag weblab-backend:latest flawas/weblab-backend:latest
docker push flawas/weblab-backend:latest