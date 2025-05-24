import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(data: CreateUserDto) {
        const user = this.repo.create(data);

        return this.repo.save(user);
    }

    findOne(id: string) {
        if (!id) return null;

        return this.repo.findOneBy({ id });
    }

    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    async update(id: string, attrs: Partial<User>) {
        const user = await this.findOne(id);

        if (!user) throw new NotFoundException('user not found');

        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: string) {
        const user = await this.findOne(id);

        if (!user) throw new NotFoundException('User not found');

        return this.repo.remove(user);
    }
}