import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '@app/contracts/categories/category.entity';
import { CreateCategoryDto } from '@app/contracts/categories/dtos/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private repo: Repository<Category>) { }

    async findOne(id: string) {
        const category = await this.repo.findOneBy({ id });
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }

    async create(dto: CreateCategoryDto) {
        const category = this.repo.create(dto);
        return this.repo.save(category);
    }

    async update(id: string, updateData: Partial<Category>) {
        const category = await this.findOne(id);
        Object.assign(category, updateData);
        return this.repo.save(category);
    }

    async remove(id: string) {
        const category = await this.findOne(id);
        return this.repo.remove(category);
    }

    async findAll() {
        return this.repo.find({
            order: { name: 'ASC' },
        });
    }
} 