import User from "./User";

interface UsersReducerState {
  users?: User[];
  currentUser?: User;
  error?: string;
  loading: boolean;
}

export default UsersReducerState;
