import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { UseSerialize } from '@app/interceptors';
import { CategoryDto } from './dtos/category.dto';
import { CurrentUser } from '@app/users';
import { User } from '@app/users';
import { AuthGuard } from '@app/guards';

@Controller('categories')
@UseSerialize(CategoryDto)
@UseGuards(AuthGuard)
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @MessagePattern('categories.create')
    async handleCreate(@Payload() body: any) {
        // You may need to adjust user extraction logic
        return this.categoriesService.create(body, body.user);
    }

    @MessagePattern('categories.findAll')
    async handleFindAll(@Payload() body: any) {
        return this.categoriesService.findAll(body.user);
    }

    @MessagePattern('categories.findOne')
    async handleFindOne(@Payload() body: any) {
        return this.categoriesService.findOne(body.id, body.user);
    }

    @MessagePattern('categories.update')
    async handleUpdate(@Payload() body: any) {
        return this.categoriesService.update(body.id, body, body.user);
    }

    @MessagePattern('categories.remove')
    async handleRemove(@Payload() body: any) {
        return this.categoriesService.remove(body.id, body.user);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createCategory(@Body() body: CreateCategoryDto, @CurrentUser() user: User) {
        return this.categoriesService.create(body, user);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getCategories(@CurrentUser() user: User) {
        return this.categoriesService.findAll(user);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getCategory(@Param('id') id: string, @CurrentUser() user: User) {
        const category = await this.categoriesService.findOne(id, user);

        if (!category) throw new NotFoundException();

        return category;
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto, @CurrentUser() user: User) {
        return this.categoriesService.update(id, body, user);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    removeCategory(@Param('id') id: string, @CurrentUser() user: User) {
        return this.categoriesService.remove(id, user);
    }
} 