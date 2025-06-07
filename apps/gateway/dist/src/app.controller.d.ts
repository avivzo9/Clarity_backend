import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly usersClient;
    private readonly transactionsClient;
    private readonly categoriesClient;
    constructor(appService: AppService, usersClient: ClientKafka, transactionsClient: ClientKafka, categoriesClient: ClientKafka);
    signup(body: any): import("rxjs").Observable<any>;
    signin(body: any): import("rxjs").Observable<any>;
    currentUser(): import("rxjs").Observable<any>;
    signout(): import("rxjs").Observable<any>;
    createTransaction(body: any): import("rxjs").Observable<any>;
    getTransactions(): import("rxjs").Observable<any>;
    getTransaction(id: string): import("rxjs").Observable<any>;
    updateTransaction(id: string, body: any): import("rxjs").Observable<any>;
    removeTransaction(id: string): import("rxjs").Observable<any>;
    createCategory(body: any): import("rxjs").Observable<any>;
    getCategories(): import("rxjs").Observable<any>;
    getCategory(id: string): import("rxjs").Observable<any>;
    updateCategory(id: string, body: any): import("rxjs").Observable<any>;
    removeCategory(id: string): import("rxjs").Observable<any>;
}
