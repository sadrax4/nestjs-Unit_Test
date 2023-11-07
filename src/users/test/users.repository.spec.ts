import { Test, TestingModule } from "@nestjs/testing"
import { UsersRepository } from '../users.repository';
import { getModelToken } from "@nestjs/mongoose"
import { User } from "../schemas/user.schema"
import { UserModel } from './support/user.model';
import { FilterQuery } from "mongoose";
import { userStubs } from './stubs/user.stubs';
let usersRepository: UsersRepository;
let userModel: UserModel;
describe("find operation", () => {
    describe("usersRepository", () => {
        let entityFilterQuery: FilterQuery<User> = userStubs();
        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    UsersRepository,
                    {
                        provide: getModelToken(User.name),
                        useClass: UserModel
                    }
                ],
            }).compile();
            usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
            userModel = moduleRef.get<UserModel>(getModelToken(User.name));
            jest.clearAllMocks();
        })
        describe("findOne is called", () => {
            describe("when findOne is called", () => {
                let user: User;
                beforeEach(async () => {
                    jest.spyOn(userModel, "findOne");
                    user = await usersRepository.findOne(entityFilterQuery);
                })
                test("then it should , find one called with user id ", () => {
                    expect(userModel.findOne).toHaveBeenCalledWith(entityFilterQuery, { _id: 0, __v: 0 });
                })
                test("then it should return user", () => {
                    expect(user).toEqual(userStubs());
                })
            })
        })
        describe("find is called", () => {
            describe("when find is called", () => {
                let users: User[];
                beforeEach(async () => {
                    jest.spyOn(userModel, "find");
                    users = await usersRepository.find(entityFilterQuery);
                })
                test("then it should , find  called id and update query ", () => {
                    expect(userModel.find).toHaveBeenCalledWith(entityFilterQuery);
                })
                test("then it should return users", () => {
                    expect(users).toEqual([userStubs()]);
                })
            })
        })
        describe("findOneAndUpdate is called", () => {
            describe("when findOneAndUpdate is called", () => {
                let user: User;
                beforeEach(async () => {
                    jest.spyOn(userModel, "findOneAndUpdate");
                    user = await usersRepository.findOneAndUpdate(entityFilterQuery, userStubs());
                })
                test("then it should  called with new user data ", () => {
                    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(entityFilterQuery, userStubs(), { new: true });
                })
                test("then it should return user", () => {
                    expect(user).toEqual(userStubs());
                })
            })
        })
    })
})
describe("create operation", () => {
    describe("create  is called", () => {
        describe("when create is called", () => {
            let saveSpy: jest.SpyInstance;
            let constructorSpy: jest.SpyInstance;
            let user: User;
            beforeEach(async () => {
                saveSpy = jest.spyOn(UserModel.prototype, "save");
                constructorSpy = jest.spyOn(UserModel.prototype, "contructorSpy");
                user = await usersRepository.create(userStubs());
                console.log(UserModel.prototype);
            })
            test("then it should  called with new user data ", () => {
                expect(saveSpy).toHaveBeenCalledWith();
                expect(constructorSpy).toHaveBeenCalledWith(userStubs());
            })
            test("then it should return user", () => {
                expect(user).toEqual(userStubs());
            })
        })
    })
})