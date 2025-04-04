import { User } from "./User";

export interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
