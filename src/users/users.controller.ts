import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './db/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<User> {
      return this.usersService.getUserById(userId);
    }
    
    @Get()
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }
  
}
