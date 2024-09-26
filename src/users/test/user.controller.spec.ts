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
})