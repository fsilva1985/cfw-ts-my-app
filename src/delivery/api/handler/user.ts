import { Router } from 'worktop'
import { UserUsecaseInterface, init as InitUserUsecase } from '../../../usecase/user'

export class UserHandler {
  private userUsecase: UserUsecaseInterface

  constructor(router: Router, userUsecase: UserUsecaseInterface) {
    this.userUsecase = userUsecase
    router.add('GET', '/users', this.getUsers)
    router.add('POST', '/users', this.createUser)
    router.add('PUT', '/users', this.updateUser)
  }

  getUsers = async (req: any, res: any) => {
    const results = await this.userUsecase.getAll()

    res.send(200, results)
  }

  createUser = async (req: any, res: any) => {
    var input = await req.body();

    await this.userUsecase.create(input)

    res.send(201)
  }

  updateUser = async (req: any, res: any) => {
    var input = await req.body();

    await this.userUsecase.update(input)

    res.send(204)
  }
}

export const init = (router: Router) => {
  const userUsecase = InitUserUsecase()

  return new UserHandler(router, userUsecase)
}

export default init
