import { UserRepository, init as InitRepository } from "../repository/planetscale/user"
import { User } from '../domain/entity/user'

export class UserUsecase {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.all()
  }
}

export const init = () => {
  const userRepository = InitRepository()

  return new UserUsecase(userRepository)
}

export default init