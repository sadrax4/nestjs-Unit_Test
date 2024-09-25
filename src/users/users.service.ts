import { Injectable } from '@nestjs/common';
import { UsersRepository } from './db/user.repository';
import { User } from './db/user.schema';
import { ObjectId } from 'mongodb';
import { UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    async getUserById(
        userId: string
    ): Promise<User> {
        return this.usersRepository.findOne({ userId })
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(
        email: string,
        age: number
    ): Promise<User> {
        return this.usersRepository.create({
            userId: new ObjectId().toHexString(),
            email,
            age,
            favoriteFoods: []
        })
    }

    async updateUser(
        userId: string,
        userUpdates: UpdateUserDto
    ): Promise<User> {
        return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
    }

}
