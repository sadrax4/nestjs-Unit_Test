import { User } from "src/users/db/user.schema"

export const userStub = (): User => {
    return {
        _id: "object id",
        userId: 'sadra3523423',
        email: 'sadra@test.com',
        age: 22,
        favoriteFoods: ['cake', 'pizza']
    }
}