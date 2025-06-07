import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { User } from '@app/users';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private repo: Repository<Category>) { }

    create(categoryDto: CreateCategoryDto, user: User) {
        const category = this.repo.create(categoryDto);
        category.user = user;
        return this.repo.save(category);
    }

    findAll(user: User) {
        return this.repo.find({ where: { user: { id: user.id } } });
    }

    async findOne(id: string, user: User) {
        if (!id) {
            return null;
        }
        return this.repo.findOne({ where: { id: parseInt(id), user: { id: user.id } } });
    }

    async update(id: string, attrs: Partial<Category>, user: User) {
        const category = await this.findOne(id, user);
        if (!category) {
            throw new NotFoundException('category not found');
        }
        Object.assign(category, attrs);
        return this.repo.save(category);
    }

    async remove(id: string, user: User) {
        const category = await this.findOne(id, user);
        if (!category) {
            throw new NotFoundException('category not found');
        }
        return this.repo.remove(category);
    }
} 