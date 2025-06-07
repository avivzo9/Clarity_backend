import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

describe('AppController', () => {
  let appController: AppController;
  let usersClient: ClientKafka;
  let transactionsClient: ClientKafka;
  let categoriesClient: ClientKafka;

  beforeEach(async () => {
    const mockUsersClient = {
      send: jest.fn(),
    };
    const mockTransactionsClient = {
      send: jest.fn(),
    };
    const mockCategoriesClient = {
      send: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'USERS_SERVICE',
          useValue: mockUsersClient,
        },
        {
          provide: 'TRANSACTIONS_SERVICE',
          useValue: mockTransactionsClient,
        },
        {
          provide: 'CATEGORIES_SERVICE',
          useValue: mockCategoriesClient,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    usersClient = app.get<ClientKafka>('USERS_SERVICE');
    transactionsClient = app.get<ClientKafka>('TRANSACTIONS_SERVICE');
    categoriesClient = app.get<ClientKafka>('CATEGORIES_SERVICE');
  });

  describe('auth', () => {
    it('should call signup', () => {
      const body = { email: 'test@test.com', password: 'password' };
      appController.signup(body);
      expect(usersClient.send).toHaveBeenCalledWith('auth.signup', body);
    });

    it('should call signin', () => {
      const body = { email: 'test@test.com', password: 'password' };
      appController.signin(body);
      expect(usersClient.send).toHaveBeenCalledWith('auth.signin', body);
    });
  });

  describe('transactions', () => {
    it('should call create transaction', () => {
      const body = { amount: 100, category: 'food' };
      appController.createTransaction(body);
      expect(transactionsClient.send).toHaveBeenCalledWith('transactions.create', body);
    });

    it('should call get transactions', () => {
      appController.getTransactions();
      expect(transactionsClient.send).toHaveBeenCalledWith('transactions.findAll', {});
    });
  });

  describe('categories', () => {
    it('should call create category', () => {
      const body = { name: 'food' };
      appController.createCategory(body);
      expect(categoriesClient.send).toHaveBeenCalledWith('categories.create', body);
    });

    it('should call get categories', () => {
      appController.getCategories();
      expect(categoriesClient.send).toHaveBeenCalledWith('categories.findAll', {});
    });
  });
});
