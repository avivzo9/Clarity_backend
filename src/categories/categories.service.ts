import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private repo: Repository<Category>) { }

    async create(dto: CreateCategoryDto, user: User) {
        const category = this.repo.create(dto);

        category.user = user;

        return this.repo.save(category);
    }

    async findAll(user: User) {
        return this.repo.find({ where: { user } });
    }

    findOne(id: string) {
        if (!id) return null;

        return this.repo.findOneBy({ id });
    }

    async remove(id: string) {
        const category = await this.findOne(id);

        if (!category) throw new NotFoundException();

        return this.repo.remove(category);
    }
}