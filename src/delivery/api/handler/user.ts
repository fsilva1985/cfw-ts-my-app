import { Router } from 'worktop'
import { UserUsecaseInterface, init as InitUserUsecase } from '../../../usecase/user'

export class UserHandler {
  private userUsecase: UserUsecaseInterface

  constructor(router: Router, userUsecase: UserUsecaseInterface) {
    this.userUsecase = userUsecase
    router.add('GET', '/users/:id', this.getUserById)
    router.add('GET', '/users', this.getAll)
    router.add('POST', '/users', this.create)
    router.add('PUT', '/users', this.update)
    router.add('DELETE', '/users/:id', this.delete)
  }

  getUserById = async (req: any, res: any) => {
    const id = Number(req.params.id)

    const result = await this.userUsecase.getById(id)

    res.send(200, result)
  }

  getAll = async (req: any, res: any) => {
    const results = await this.userUsecase.getAll()

    res.send(200, results)
  }

  create = async (req: any, res: any) => {
    var input = await req.body()

    await this.userUsecase.create(input)

    res.send(201)
  }

  update = async (req: any, res: any) => {
    try {
      var input = await req.body()

      await this.userUsecase.update(input)

      res.send(204)
    } catch (err) {
      console.log(err)

      res.send(500)
    }
  }

  delete = async (req: any, res: any) => {
    const id = Number(req.params.id)

    await this.userUsecase.getById(id)

    res.send(204)
  }
}

export const init = (router: Router) => {
  const userUsecase = InitUserUsecase()

  return new UserHandler(router, userUsecase)
}

export default init
