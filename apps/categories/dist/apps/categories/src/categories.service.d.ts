import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { User } from '@app/users';
export declare class CategoriesService {
    private repo;
    constructor(repo: Repository<Category>);
    create(categoryDto: CreateCategoryDto, user: User): Promise<Category>;
    findAll(user: User): Promise<Category[]>;
    findOne(id: string, user: User): Promise<Category>;
    update(id: string, attrs: Partial<Category>, user: User): Promise<Category>;
    remove(id: string, user: User): Promise<Category>;
}
