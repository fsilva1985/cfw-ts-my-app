import { UserRepositoryInterface, init as InitRepository } from "../repository/user"
import { User } from '../domain/entity/user'

export interface UserUsecaseInterface {
  getAll(): Promise<User[]>
}

export class UserUsecase implements UserUsecaseInterface {
  private userRepository: UserRepositoryInterface

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll()
  }
}

export const init = () => {
  const userRepository = InitRepository()

  return new UserUsecase(userRepository)
}

export default init