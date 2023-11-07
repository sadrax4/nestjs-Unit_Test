import { ModelMock } from "../../../database/test/support/model.mock";
import { User } from "src/users/schemas/user.schema";
import { userStubs } from "../stubs/user.stubs";

export class UserModel extends ModelMock<User>{
    protected entityStubs: User = userStubs();
}