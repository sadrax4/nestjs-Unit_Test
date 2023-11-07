import { userStubs } from '../test/stubs/user.stubs';
export const UsersService = jest.fn().mockReturnValue({
    getUserById: jest.fn().mockResolvedValue(userStubs()),
    getUsers: jest.fn().mockResolvedValue([userStubs()]),
    createUser: jest.fn().mockResolvedValue(userStubs()),
    updateUser: jest.fn().mockResolvedValue(userStubs())
})