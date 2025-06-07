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
export declare const KAFKA_TOPICS: {
    readonly TRANSACTION: {
        readonly CREATED: "transaction_created";
        readonly UPDATED: "transaction_updated";
        readonly DELETED: "transaction_deleted";
    };
    readonly USER: {
        readonly CREATED: "user_created";
        readonly UPDATED: "user_updated";
        readonly DELETED: "user_deleted";
    };
};
