import { Injectable } from '@nestjs/common';
import { UsersRepository } from './db/user.repository';
import { User } from './db/user.schema';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    async getUserById(userId: string): Promise<User> {
        return this.usersRepository.findOne({ userId })
    }
    
    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

}
