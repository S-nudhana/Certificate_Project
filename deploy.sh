set -e

echo "Start Building"

echo "Down old containers and networks"
docker-compose down

echo "Removing old images"
docker system prune -f

echo "Starting deployment"

echo "Building Docker containers"
docker-compose build --no-cache

echo "Starting services"
docker-compose up -d

echo "Waiting for services to start..."
sleep 10

echo "Deployment completed successfully!"

echo "Running containers:"
docker-compose ps -a
