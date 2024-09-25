import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './db/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    }])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
