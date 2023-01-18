import { UserRepositoryInterface, init as InitRepository } from "../repository/user"
import { User } from '../domain/entity/user'

export interface UserUsecaseInterface {
  getById(userId: number): Promise<User>
  getAll(): Promise<User[]>
  create(user: User): Promise<User>
  update(user: User): Promise<User>
  checkUserById(userId: number): Promise<boolean>
}

export class UserUsecase implements UserUsecaseInterface {
  private userRepository: UserRepositoryInterface

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository
  }

  async getById(userId: number): Promise<User> {
    return await this.userRepository.getById(userId)
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

  async checkUserById(userId: number): Promise<boolean> {
    const response = await this.getById(userId)

    if (response.id === 0) {
      return false
    }

    return true
  }
}

export const init = () => {
  const userRepository = InitRepository()

  return new UserUsecase(userRepository)
}

export default init