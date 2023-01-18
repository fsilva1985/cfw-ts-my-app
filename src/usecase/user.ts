import { UserRepositoryInterface, init as InitRepository } from "../repository/user"
import { User } from '../domain/entity/user'

export interface UserUsecaseInterface {
  getAll(): Promise<User[]>
  create(user: User): Promise<User>
  update(user: User): Promise<User>
}

export class UserUsecase implements UserUsecaseInterface {
  private userRepository: UserRepositoryInterface

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll()
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.create(user)
  }

  async update(user: User): Promise<User> {
    return await this.userRepository.update(user)
  }
}

export const init = () => {
  const userRepository = InitRepository()

  return new UserUsecase(userRepository)
}

export default init