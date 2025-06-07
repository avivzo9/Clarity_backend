import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(email: string, password: string): Promise<User>;
    findOne(id: string): Promise<User>;
    find(email: string): Promise<User[]>;
    update(id: string, attrs: Partial<User>): Promise<User>;
    remove(id: string): Promise<User>;
}
//# sourceMappingURL=users.service.d.ts.map