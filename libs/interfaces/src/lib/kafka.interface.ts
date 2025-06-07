export interface KafkaMessage {
    key: string;
    value: any;
    timestamp: string;
}

export interface TransactionEvent {
    id: string;
    userId: string;
    amount: number;
    category: string;
    description: string;
    timestamp: string;
}

export interface UserEvent {
    id: string;
    email: string;
    action: 'created' | 'updated' | 'deleted';
    timestamp: string;
}

export const KAFKA_TOPICS = {
    TRANSACTION: {
        CREATED: 'transaction_created',
        UPDATED: 'transaction_updated',
        DELETED: 'transaction_deleted'
    },
    USER: {
        CREATED: 'user_created',
        UPDATED: 'user_updated',
        DELETED: 'user_deleted'
    }
} as const; 