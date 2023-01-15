import { Router } from 'worktop'
import { UserUsecase, init as InitUserUsecase } from '../../../usecase/user';

export class UserHandler {
  private userUsecase: UserUsecase

  constructor(router: Router, userUsecase: any) {
    this.userUsecase = userUsecase
    router.add('GET', '/users', this.getUsers)
  }

  getUsers = async (req: any, res: any) => {
    const results = await this.userUsecase.getUsers()

    res.send(200, results)
  }
}

export const init = (router: Router) => {
  const userUsecase = InitUserUsecase()

  return new UserHandler(router, userUsecase)
}

export default init
