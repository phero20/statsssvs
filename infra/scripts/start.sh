#!/bin/bash

# Check if .env exists in api folder, if not copy from example
if [ ! -f api/.env ]; then
    echo "Creating .env from example..."
    cp api/.env.example api/.env
fi

echo "Starting Docker services..."
docker compose up -d --build

echo "Services are running!"
