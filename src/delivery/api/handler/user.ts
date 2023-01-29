import { Router } from 'worktop'
import { ServerRequest as Request } from 'worktop/request'
import { ServerResponse as Response } from 'worktop/response'
import { UserUsecaseInterface, init as InitUserUsecase } from '../../../usecase/user'
import { User, schema } from '../../../domain/entity/user'

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

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)

      const result = await this.userUsecase.getById(id)

      res.send(200, result)
    } catch (err: any) {
      console.log(err)

      res.send(500, err)
    }
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const results = await this.userUsecase.getAll()

      res.send(200, results)
    } catch (err: any) {
      console.log(err)

      res.send(500, err)
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const payload = await req.body()
      const user = schema.omit({ id: true }).parse(payload) as User

      await this.userUsecase.create(user)

      res.send(201)
    } catch (err: any) {
      console.log(err)

      res.send(500, err)
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const payload = await req.body()
      const user = schema.parse(payload) as User

      await this.userUsecase.update(user)

      res.send(204)
    } catch (err: any) {
      console.log(err)
      
      res.send(500, err)
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)

      await this.userUsecase.getById(id)

      res.send(204)
    } catch (err: any) {
      console.log(err)

      res.send(500, err)
    }
  }
}

export const init = (router: Router) => {
  const userUsecase = InitUserUsecase()

  return new UserHandler(router, userUsecase)
}

export default init
