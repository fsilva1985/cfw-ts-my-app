import { Router } from 'worktop'
import { UserUsecaseInterface, init as InitUserUsecase } from '../../../usecase/user'

export class UserHandler {
  private userUsecase: UserUsecaseInterface

  constructor(router: Router, userUsecase: UserUsecaseInterface) {
    this.userUsecase = userUsecase
    router.add('GET', '/users', this.getUsers)
  }

  getUsers = async (req: any, res: any) => {
    const results = await this.userUsecase.getAll()

    res.send(200, results)
  }
}

export const init = (router: Router) => {
  const userUsecase = InitUserUsecase()

  return new UserHandler(router, userUsecase)
}

export default init
