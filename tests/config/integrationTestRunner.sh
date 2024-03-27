#!/bin/bash

# Load environment variables
source .env

# Create database
if npx sequelize db:create --env test; then
  echo "Database created"
else
  echo "Error: Failed to create database"
fi

if npx sequelize db:migrate --env test; then
  echo "Migration of tables succeeded"
else
  echo "Error: Failed to migrate tables"
fi

# Run tests
if NODE_OPTIONS=--max-old-space-size=3000 jest --detectOpenHandles --logHeapUsage -w 1 --forceExit --config ./jest.config.integration.cjs; then
  echo "Tests passed"
else
  echo "Error: Tests failed"

  # Drop database
  if npx sequelize db:drop --env test; then
    echo "$TEST_DB_NAME database dropped"
  else
    echo "Error: Failed to drop database"
  fi

  exit 1
fi

# Drop database
if npx sequelize db:drop --env test; then
  echo "$TEST_DB_NAME database dropped"
else
  echo "Error: Failed to drop database"
fi
