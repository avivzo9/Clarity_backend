import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { User } from '@app/users';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    handleCreate(body: any): Promise<import("./category.entity").Category>;
    handleFindAll(body: any): Promise<import("./category.entity").Category[]>;
    handleFindOne(body: any): Promise<import("./category.entity").Category>;
    handleUpdate(body: any): Promise<import("./category.entity").Category>;
    handleRemove(body: any): Promise<import("./category.entity").Category>;
    createCategory(body: CreateCategoryDto, user: User): Promise<import("./category.entity").Category>;
    getCategories(user: User): Promise<import("./category.entity").Category[]>;
    getCategory(id: string, user: User): Promise<import("./category.entity").Category>;
    updateCategory(id: string, body: UpdateCategoryDto, user: User): Promise<import("./category.entity").Category>;
    removeCategory(id: string, user: User): Promise<import("./category.entity").Category>;
}
