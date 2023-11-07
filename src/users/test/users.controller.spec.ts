import { Test, TestingModule } from "@nestjs/testing"
import { User } from "../schemas/user.schema";
import { UsersController } from "../users.controller"
import { UsersService } from "../users.service"
import { userStubs } from "./stubs/user.stubs";
jest.mock('../users.service');
describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;
    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [UsersController],
            providers: [UsersService]
        }).compile();
        usersController = moduleRef.get<UsersController>(UsersController);
        usersService = moduleRef.get<UsersService>(UsersService);
        jest.clearAllMocks();
    })
    describe('user controller', () => {
        describe('when getUser is called', () => {
            let user: User;
            beforeEach(async () => {
                user = await usersController.getUser(userStubs().userId)
            })
            test('then it should call userId', () => {
                expect(usersService.getUserById).toHaveBeenCalledWith(userStubs().userId);
            })
            test("then it should return user", () => {
                expect(user).toEqual(userStubs())
            })
        })
        describe("when getUsers is called", () => {
            let users: User[];
            beforeEach(async () => {
                users = await usersController.getUsers();
            })
            test("then it should called  with null data", () => {
                expect(usersService.getUsers).toHaveBeenCalledWith();
            })
            test("then it should return array of users", () => {
                expect(users).toEqual([userStubs()]);
            })
        })
        describe("when createUser is called", () => {
            let user: User;
            beforeEach(async () => {
                user = await usersController.createUser(userStubs());
            })
            test("then it should called with user eamil and user age ", () => {
                expect(usersService.createUser).toHaveBeenCalledWith(userStubs().email, userStubs().age);
            })
            test("then it should  return user", () => {
                expect(user).toEqual(userStubs());
            })
        })
        describe("when updateUser is called", () => {
            let user: User;
            beforeEach(async () => {
                user = await usersController.updateUser(userStubs().userId, userStubs());
            })
            test("then it should called with user id and user data", () => {
                expect(usersService.updateUser).toHaveBeenCalledWith(userStubs().userId, userStubs());
            })
            test("then it should return user data", () => {
                expect(user).toEqual(userStubs());
            })
        })
    })
})