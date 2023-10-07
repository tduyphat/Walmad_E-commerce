import User from "./User";

interface UsersReducerState {
  users: User[];
  currentUser?: User;
  error?: string;
}

export default UsersReducerState;

