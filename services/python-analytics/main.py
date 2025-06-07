import os
import json
from kafka import KafkaConsumer
from datetime import datetime

# Kafka configuration
KAFKA_BROKERS = os.getenv('KAFKA_BROKERS', 'kafka:29092').split(',')
TOPICS = [
    'transaction_created',
    'transaction_updated',
    'transaction_deleted',
    'user_created',
    'user_updated',
    'user_deleted'
]

def process_transaction_event(message):
    """Process transaction-related events and generate insights."""
    try:
        data = json.loads(message.value.decode('utf-8'))
        event_type = message.topic
        timestamp = datetime.now().isoformat()
        
        print(f"[{timestamp}] Received {event_type} event:")
        print(f"Data: {json.dumps(data, indent=2)}")
        
        # TODO: Add analytics processing logic here
        # This could include:
        # - Calculating transaction statistics
        # - Detecting patterns
        # - Generating reports
        # - Storing insights in a database
        
    except Exception as e:
        print(f"Error processing message: {str(e)}")

def main():
    print("Starting Python Analytics Service...")
    print(f"Connecting to Kafka brokers: {KAFKA_BROKERS}")
    
    # Create Kafka consumer
    consumer = KafkaConsumer(
        *TOPICS,
        bootstrap_servers=KAFKA_BROKERS,
        group_id='analytics-group',
        auto_offset_reset='earliest',
        enable_auto_commit=True
    )
    
    print("Successfully connected to Kafka")
    print(f"Listening to topics: {TOPICS}")
    
    try:
        for message in consumer:
            process_transaction_event(message)
    except KeyboardInterrupt:
        print("\nShutting down...")
    finally:
        consumer.close()

if __name__ == "__main__":
    main() 