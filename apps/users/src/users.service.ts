import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });

        return this.repo.save(user);
    }

    findOne(id: string) {
        if (!id) {
            return null;
        }
        return this.repo.findOne({ where: { id: parseInt(id) } });
    }

    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    async update(id: string, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return this.repo.remove(user);
    }
} 