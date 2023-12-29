import UserRegisterInput from "./UserRegisterInput";

interface UpdateUserInput {
  update: Partial<UserRegisterInput>
  id: string;
}

export default UpdateUserInput;