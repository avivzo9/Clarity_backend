from fastapi import FastAPI, HTTPException
from kafka import KafkaConsumer
import json
import os
import logging
from typing import Dict, List
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn.ensemble import IsolationForest
from collections import defaultdict

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

# In-memory storage for analytics
transactions_data: List[Dict] = []

def detect_anomalies(transactions: List[Dict]) -> List[Dict]:
    """Detect anomalous transactions using Isolation Forest."""
    if len(transactions) < 10:
        return []
    
    df = pd.DataFrame(transactions)
    features = df[['amount']].values
    
    # Train isolation forest
    iso_forest = IsolationForest(contamination=0.1, random_state=42)
    df['anomaly_score'] = iso_forest.fit_predict(features)
    
    # Return anomalous transactions
    anomalies = df[df['anomaly_score'] == -1].to_dict('records')
    return anomalies

def analyze_spending_patterns(transactions: List[Dict]) -> Dict:
    """Analyze spending patterns including time-based and category-based insights."""
    if not transactions:
        return {}
    
    df = pd.DataFrame(transactions)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    
    # Time-based patterns
    df['hour'] = df['timestamp'].dt.hour
    df['day_of_week'] = df['timestamp'].dt.day_name()
    
    # Calculate patterns
    patterns = {
        'peak_spending_hours': df.groupby('hour')['amount'].mean().nlargest(3).to_dict(),
        'day_of_week_spending': df.groupby('day_of_week')['amount'].mean().to_dict(),
        'category_trends': df.groupby('category')['amount'].agg(['mean', 'sum', 'count']).to_dict('index'),
        'recent_trend': df.groupby(df['timestamp'].dt.strftime('%Y-%m-%d'))['amount'].sum().tail(7).to_dict()
    }
    
    return patterns

def process_transaction(transaction: Dict):
    """Process a transaction and update analytics."""
    try:
        logger.info(f"Processing transaction: {json.dumps(transaction)}")
        transactions_data.append(transaction)
        # Keep only last 1000 transactions for demo purposes
        if len(transactions_data) > 1000:
            transactions_data.pop(0)
    except Exception as e:
        logger.error(f"Error processing transaction: {str(e)}", exc_info=True)

def get_user_analytics(user_id: str) -> Dict:
    """Calculate comprehensive analytics for a specific user."""
    try:
        user_transactions = [t for t in transactions_data if t['userId'] == user_id]
        
        if not user_transactions:
            return {"error": "No transactions found for user"}
        
        # Basic analytics
        df = pd.DataFrame(user_transactions)
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        
        # Detect anomalies
        anomalies = detect_anomalies(user_transactions)
        
        # Analyze spending patterns
        patterns = analyze_spending_patterns(user_transactions)
        
        # Calculate category insights
        category_insights = df.groupby('category').agg({
            'amount': ['sum', 'mean', 'count'],
            'timestamp': ['min', 'max']
        }).to_dict('index')
        
        return {
            "total_transactions": len(user_transactions),
            "total_spent": float(df['amount'].sum()),
            "average_transaction": float(df['amount'].mean()),
            "categories": df.groupby('category')['amount'].sum().to_dict(),
            "monthly_trend": df.groupby(df['timestamp'].dt.strftime('%Y-%m'))['amount'].sum().to_dict(),
            "anomalies": anomalies,
            "spending_patterns": patterns,
            "category_insights": category_insights,
            "last_updated": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error calculating analytics for user {user_id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Error calculating analytics")

@app.get("/analytics/user/{user_id}")
async def get_user_summary(user_id: str):
    return get_user_analytics(user_id)

@app.get("/analytics/user/{user_id}/anomalies")
async def get_user_anomalies(user_id: str):
    user_transactions = [t for t in transactions_data if t['userId'] == user_id]
    return {"anomalies": detect_anomalies(user_transactions)}

@app.get("/analytics/user/{user_id}/patterns")
async def get_user_patterns(user_id: str):
    user_transactions = [t for t in transactions_data if t['userId'] == user_id]
    return {"patterns": analyze_spending_patterns(user_transactions)}

def start_kafka_consumer():
    """Start Kafka consumer to listen for transaction events."""
    try:
        logger.info("Starting Kafka consumer...")
        consumer = KafkaConsumer(
            'transaction_created',
            'transaction_updated',
            'transaction_deleted',
            bootstrap_servers=os.getenv('KAFKA_BROKERS', 'localhost:9092').split(','),
            group_id='analytics-consumer',
            auto_offset_reset='earliest',
            value_deserializer=lambda x: json.loads(x.decode('utf-8'))
        )
        
        logger.info("Kafka consumer started successfully")
        for message in consumer:
            process_transaction(message.value)
    except Exception as e:
        logger.error(f"Error in Kafka consumer: {str(e)}", exc_info=True)
        # Retry connection after a delay
        import time
        time.sleep(5)
        start_kafka_consumer()

if __name__ == "__main__":
    import threading
    # Start Kafka consumer in a separate thread
    kafka_thread = threading.Thread(target=start_kafka_consumer, daemon=True)
    kafka_thread.start()
    
    # Start FastAPI server
    import uvicorn
    logger.info("Starting FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=3002) 