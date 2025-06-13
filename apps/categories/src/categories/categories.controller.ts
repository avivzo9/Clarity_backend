import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '@app/contracts/categories/dtos/create-category.dto';
import { Category } from '@app/contracts/categories/category.entity';

@Controller()
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @MessagePattern('get_category')
    async getCategory(@Payload() data: { id: string }) {
        return this.categoriesService.findOne(data.id);
    }

    @MessagePattern('create_category')
    async createCategory(@Payload() data: CreateCategoryDto) {
        return this.categoriesService.create(data);
    }

    @MessagePattern('update_category')
    async updateCategory(@Payload() data: { id: string; updateData: Partial<Category> }) {
        return this.categoriesService.update(data.id, data.updateData);
    }

    @MessagePattern('delete_category')
    async deleteCategory(@Payload() data: { id: string }) {
        return this.categoriesService.remove(data.id);
    }

    @MessagePattern('get_all_categories')
    async getAllCategories() {
        return this.categoriesService.findAll();
    }
} 