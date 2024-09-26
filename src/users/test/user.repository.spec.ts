import { getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { FilterQuery } from "mongoose"
import { User } from "../schemas/user.schema"
import { UsersRepository } from "../users.repository"
import { userStub } from "./stubs/user.stub"
import { UserModel } from "./support/user.model"

describe('UsersRepository', () => {
    let usersRepository: UsersRepository;

    describe('find operations', () => {
        let userModel: UserModel;
        let userFilterQuery: FilterQuery<User>;

        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    UsersRepository,
                    {
                        provide: getModelToken(User.name),
                        useClass: UserModel
                    }
                ]
            }).compile();

            usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
            userModel = moduleRef.get<UserModel>(getModelToken(User.name));

            userFilterQuery = {
                userId: userStub().userId
            }

            jest.clearAllMocks();
        })
    })

})