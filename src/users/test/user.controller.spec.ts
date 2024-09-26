import { Test } from "@nestjs/testing"
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../schemas/user.schema";
import { UsersController } from "../users.controller"
import { UsersService } from "../users.service"
import { userStub } from "./stubs/user.stub";

jest.mock('../users.service');

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [UsersController],
            providers: [UsersService]
        }).compile();

        usersController = moduleRef.get<UsersController>(UsersController);
        usersService = moduleRef.get<UsersService>(UsersService);
        jest.clearAllMocks();
    })

    describe('getUser', () => {
        describe('when getUser is called', () => {
            let user: User;

            beforeEach(async () => {
                user = await usersController.getUser(userStub().userId)
            })

            test('then it should call usersService', () => {
                expect(usersService.getUserById).toBeCalledWith(userStub().userId);
            })

            test('then is should return a user', () => {
                expect(user).toEqual(userStub());
            })
        })
    })
})