#!/bin/bash

# Wait for Kafka to be ready
echo "Waiting for Kafka to be ready..."
sleep 10

# Create topics
echo "Creating Kafka topics..."

# Transaction topics
kafka-topics --create --if-not-exists \
  --bootstrap-server kafka:29092 \
  --topic transaction_created \
  --partitions 1 \
  --replication-factor 1

kafka-topics --create --if-not-exists \
  --bootstrap-server kafka:29092 \
  --topic transaction_updated \
  --partitions 1 \
  --replication-factor 1

kafka-topics --create --if-not-exists \
  --bootstrap-server kafka:29092 \
  --topic transaction_deleted \
  --partitions 1 \
  --replication-factor 1

# User topics
kafka-topics --create --if-not-exists \
  --bootstrap-server kafka:29092 \
  --topic user_created \
  --partitions 1 \
  --replication-factor 1

kafka-topics --create --if-not-exists \
  --bootstrap-server kafka:29092 \
  --topic user_updated \
  --partitions 1 \
  --replication-factor 1

kafka-topics --create --if-not-exists \
  --bootstrap-server kafka:29092 \
  --topic user_deleted \
  --partitions 1 \
  --replication-factor 1

echo "Kafka topics created successfully!" 