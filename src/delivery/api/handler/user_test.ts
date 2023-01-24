import { Router } from 'worktop'
import { UserHandler } from './user'
import { UserUsecaseInterface } from '../../../usecase/user'
import { mock } from 'jest-mock-extended'

describe("should test userHandler", () => {
  const items = [
    {
      description: "should test method getById",
      usecase: (): UserUsecaseInterface => {
        const usecase = mock<UserUsecaseInterface>()
        return usecase
      },
      url: 'http://localhost/users/1',
      method: 'GET',
      expected: 200
    },
    {
      description: "should test method getById Exception",
      usecase: (): any => {
        const usecase = mock<UserUsecaseInterface>()
        return usecase.getById.mockImplementationOnce(() => {
          throw new Error();
        })

      },
      url: 'http://localhost/users/1',
      method: 'GET',
      expected: 500
    },
    {
      description: "should test method getAll",
      usecase: (): UserUsecaseInterface => {
        const usecase = mock<UserUsecaseInterface>()
        return usecase
      },
      url: 'http://localhost/users',
      method: 'GET',
      expected: 200
    },
    {
      description: "should test method getAll Exception",
      usecase: (): any => {
        const usecase = mock<UserUsecaseInterface>()
        return usecase.getById.mockImplementationOnce(() => {
          throw new Error();
        })

      },
      url: 'http://localhost/users',
      method: 'GET',
      expected: 500
    },
    {
      description: "should test method create",
      usecase: (): UserUsecaseInterface => {
        const usecase = mock<UserUsecaseInterface>()
        return usecase
      },
      url: 'http://localhost/users',
      method: 'POST',
      expected: 201
    },
    {
      description: "should test method create Exception",
      usecase: (): any => {
        const usecase = mock<UserUsecaseInterface>()
        return usecase.getById.mockImplementationOnce(() => {
          throw new Error();
        })
      },
      url: 'http://localhost/users',
      method: 'POST',
      expected: 500
    },
    {
      description: "should test method update",
      usecase: (): UserUsecaseInterface => {
        const usecase = mock<UserUsecaseInterface>()
        return usecase
      },
      url: 'http://localhost/users',
      method: 'PUT',
      expected: 204
    },
    {
      description: "should test method update Exception",
      usecase: (): any => {
        const usecase = mock<UserUsecaseInterface>()
        return usecase.getById.mockImplementationOnce(() => {
          throw new Error();
        })
      },
      url: 'http://localhost/users',
      method: 'PUT',
      expected: 500
    },
    {
      description: "should test method delete",
      usecase: (): UserUsecaseInterface => {
        const usecase = mock<UserUsecaseInterface>()
        return usecase
      },
      url: 'http://localhost/users/1',
      method: 'DELETE',
      expected: 204
    },
    {
      description: "should test method delete Exception",
      usecase: (): any => {
        const usecase = mock<UserUsecaseInterface>()
        return usecase.getById.mockImplementationOnce(() => {
          throw new Error();
        })
      },
      url: 'http://localhost/users/1',
      method: 'DELETE',
      expected: 500
    },
  ]

  items.forEach((item) => {
    it(`test ${item.description}`, async () => {
      const router = new Router()
      new UserHandler(router, item.usecase())

      const event = new FetchEvent('fetch', { request: new Request(item.url, { method: item.method }) })
      const response = await router.run(event)

      expect(response.status).toBe(item.expected)
    })
  })
})
