import { Controller, Post, Body, Get, Param, Patch, Delete, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka,
    @Inject('TRANSACTIONS_SERVICE') private readonly transactionsClient: ClientKafka,
    @Inject('CATEGORIES_SERVICE') private readonly categoriesClient: ClientKafka,
  ) { }

  // Users Routes
  @Post('auth/signup')
  signup(@Body() body: any) {
    return this.usersClient.send('auth.signup', body);
  }

  @Post('auth/signin')
  signin(@Body() body: any) {
    return this.usersClient.send('auth.signin', body);
  }

  @Get('auth/currentuser')
  currentUser() {
    return this.usersClient.send('auth.currentuser', {});
  }

  @Post('auth/signout')
  signout() {
    return this.usersClient.send('auth.signout', {});
  }

  // Transactions Routes
  @Post('transactions')
  createTransaction(@Body() body: any) {
    return this.transactionsClient.send('transactions.create', body);
  }

  @Get('transactions')
  getTransactions() {
    return this.transactionsClient.send('transactions.findAll', {});
  }

  @Get('transactions/:id')
  getTransaction(@Param('id') id: string) {
    return this.transactionsClient.send('transactions.findOne', { id });
  }

  @Patch('transactions/:id')
  updateTransaction(@Param('id') id: string, @Body() body: any) {
    return this.transactionsClient.send('transactions.update', { id, ...body });
  }

  @Delete('transactions/:id')
  removeTransaction(@Param('id') id: string) {
    return this.transactionsClient.send('transactions.remove', { id });
  }

  // Categories Routes
  @Post('categories')
  createCategory(@Body() body: any) {
    return this.categoriesClient.send('categories.create', body);
  }

  @Get('categories')
  getCategories() {
    return this.categoriesClient.send('categories.findAll', {});
  }

  @Get('categories/:id')
  getCategory(@Param('id') id: string) {
    return this.categoriesClient.send('categories.findOne', { id });
  }

  @Patch('categories/:id')
  updateCategory(@Param('id') id: string, @Body() body: any) {
    return this.categoriesClient.send('categories.update', { id, ...body });
  }

  @Delete('categories/:id')
  removeCategory(@Param('id') id: string) {
    return this.categoriesClient.send('categories.remove', { id });
  }
}
