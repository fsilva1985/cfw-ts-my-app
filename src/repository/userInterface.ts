import { User } from '../domain/entity/user'

export interface UserRepositoryInterface {
  getAll(): Promise<User[]>;
}