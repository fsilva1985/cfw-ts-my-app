import { Router } from 'worktop'
import { UserHandler } from './user'
import { UserUsecaseInterface } from '../../../usecase/user'
import { mock } from 'jest-mock-extended'

describe('should test userHandler', () => {
  const items = [
    {
      description: 'should test method getById',
      usecase: (): UserUsecaseInterface => mock<UserUsecaseInterface>(),
      url: 'http://localhost/users/1',
      method: 'GET',
      body: null,
      expected: 200
    },
    {
      description: 'should test method getById Exception',
      usecase: (): any => mock<UserUsecaseInterface>().getById.mockImplementationOnce(() => {
        throw new Error()
      }),
      url: 'http://localhost/users/1',
      method: 'GET',
      body: null,
      expected: 500
    },
    {
      description: 'should test method getAll',
      usecase: (): UserUsecaseInterface => mock<UserUsecaseInterface>(),
      url: 'http://localhost/users',
      method: 'GET',
      body: null,
      expected: 200
    },
    {
      description: 'should test method getAll Exception',
      usecase: (): any => mock<UserUsecaseInterface>().getById.mockImplementationOnce(() => {
        throw new Error()
      }),
      url: 'http://localhost/users',
      method: 'GET',
      body: null,
      expected: 500
    },
    {
      description: 'should test method create',
      usecase: (): UserUsecaseInterface => mock<UserUsecaseInterface>(),
      url: 'http://localhost/users',
      method: 'POST',
      body: JSON.stringify({
        'firstName': 'felipe',
        'lastName': 'silva',
        'age': 37
      }),
      expected: 201
    },
    {
      description: 'should test method create Exception',
      usecase: (): any => mock<UserUsecaseInterface>().getById.mockImplementationOnce(() => {
        throw new Error()
      }),
      url: 'http://localhost/users',
      method: 'POST',
      body: null,
      expected: 500
    },
    {
      description: 'should test method update',
      usecase: (): UserUsecaseInterface => mock<UserUsecaseInterface>(),
      url: 'http://localhost/users',
      method: 'PUT',
      body: JSON.stringify({
        'id': 1,
        'firstName': 'felipe',
        'lastName': 'silva',
        'age': 37
      }),
      expected: 204
    },
    {
      description: 'should test method update Exception',
      usecase: (): any => mock<UserUsecaseInterface>().getById.mockImplementationOnce(() => {
        throw new Error()
      }),
      url: 'http://localhost/users',
      method: 'PUT',
      body: null,
      expected: 500
    },
    {
      description: 'should test method delete',
      usecase: (): UserUsecaseInterface => mock<UserUsecaseInterface>(),
      url: 'http://localhost/users/1',
      method: 'DELETE',
      body: null,
      expected: 204
    },
    {
      description: 'should test method delete Exception',
      usecase: (): any => mock<UserUsecaseInterface>().getById.mockImplementationOnce(() => {
        throw new Error()
      }),
      url: 'http://localhost/users/1',
      method: 'DELETE',
      body: null,
      expected: 500
    },
  ]

  items.forEach((item) => {
    it(`test ${item.description}`, async () => {
      const router = new Router()
      new UserHandler(router, item.usecase())

      const event = new FetchEvent('fetch', {
        request: new Request(
          item.url,
          {
            method: item.method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: item.body
          }
        )
      })
      const response = await router.run(event)

      expect(response.status).toBe(item.expected)
    })
  })
})
