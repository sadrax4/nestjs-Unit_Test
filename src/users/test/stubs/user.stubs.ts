import { User } from "src/users/schemas/user.schema";

export const userStubs = (): User => {
    return {
        userId: "1234",
        email: "sddr@gmail.com",
        age: 20,
        favoriteFoods: ["game", "gym"]
    }
}