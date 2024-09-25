import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { AbstractRepository } from "@app/common";
import { User } from "./user.schema";

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
    constructor(
        @InjectModel(User.name)
        private userSchema: Model<User>
    ) {
        super(userSchema);
    }
}