import { User } from '../aggregate/user.aggregate';

export interface UserRepository {
  save(user: User): Promise<void>;

  findById(userId: string): Promise<User | null>;
}

export const UserRepository = Symbol('UserRepository');
