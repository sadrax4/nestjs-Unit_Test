import { Injectable } from '@nestjs/common';
import { UsersRepository } from './db/user.repository';
import { User } from './db/user.schema';
import { ObjectId } from 'mongodb';

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

    async createUser(email: string, age: number): Promise<User> {
        return this.usersRepository.create({
            userId: new ObjectId().toHexString(),
            email,
            age,
            favoriteFoods: []
        })
    }

}
