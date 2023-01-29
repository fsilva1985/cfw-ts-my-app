import { Router } from 'worktop'
import { UserHandler } from './user'
import { UserUsecaseInterface } from '../../../usecase/user'
import { mock } from 'jest-mock-extended'

describe("should test userHandler method getById", () => {
  const items = [
    {
      description: "should test ok",
      usecase: (): UserUsecaseInterface => mock<UserUsecaseInterface>(),
      url: 'http://localhost/users/1',
      method: 'GET',
      body: null,
      expected: 200
    },
    {
      description: "should test usecase error",
      usecase: (): any => mock<UserUsecaseInterface>().getById.mockImplementationOnce(() => {
        throw new Error();
      }),
      url: 'http://localhost/users/1',
      method: 'GET',
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
            method: item.method
          }
        )
      })
      const response = await router.run(event)

      expect(response.status).toBe(item.expected)
    })
  })
})

describe("should test userHandler method getAll", () => {
  const items = [
    {
      description: "should test ok",
      usecase: (): UserUsecaseInterface => mock<UserUsecaseInterface>(),
      url: 'http://localhost/users',
      method: 'GET',
      body: null,
      expected: 200
    },
    {
      description: "should test usecase error",
      usecase: (): any => mock<UserUsecaseInterface>().getById.mockImplementationOnce(() => {
        throw new Error();
      }),
      url: 'http://localhost/users',
      method: 'GET',
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
            method: item.method
          }
        )
      })
      const response = await router.run(event)

      expect(response.status).toBe(item.expected)
    })
  })
})

describe("should test userHandler method create", () => {
  const items = [
    {
      description: "should test ok",
      usecase: (): UserUsecaseInterface => mock<UserUsecaseInterface>(),
      url: 'http://localhost/users',
      method: 'POST',
      body: {
        "firstName": "felipe",
        "lastName": "silva",
        "age": 37
      },
      expected: 201
    },
    {
      description: "should test method error payload validation",
      usecase: (): UserUsecaseInterface => mock<UserUsecaseInterface>(),
      url: 'http://localhost/users',
      method: 'POST',
      body: {
        "firstName": 10
      },
      expected: 500
    },
    {
      description: "should test method error usecase",
      usecase: (): any => mock<UserUsecaseInterface>().getById.mockImplementationOnce(() => {
        throw new Error();
      }),
      url: 'http://localhost/users',
      method: 'POST',
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
            body: JSON.stringify(item.body)
          }
        )
      })
      const response = await router.run(event)

      expect(response.status).toBe(item.expected)
    })
  })
})

describe("should test userHandler method update", () => {
  const items = [
    {
      description: "should test ok",
      usecase: (): UserUsecaseInterface => mock<UserUsecaseInterface>(),
      url: 'http://localhost/users',
      method: 'PUT',
      body: {
        "id": 1,
        "firstName": "felipe",
        "lastName": "silva",
        "age": 37
      },
      expected: 204
    },
    {
      description: "should test method error payload validation",
      usecase: (): UserUsecaseInterface => mock<UserUsecaseInterface>(),
      url: 'http://localhost/users',
      method: 'PUT',
      body: {
        "firstName": 10
      },
      expected: 500
    },
    {
      description: "should test method error usecase",
      usecase: (): any => mock<UserUsecaseInterface>().getById.mockImplementationOnce(() => {
        throw new Error();
      }),
      url: 'http://localhost/users',
      method: 'PUT',
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
            body: JSON.stringify(item.body)
          }
        )
      })
      const response = await router.run(event)

      expect(response.status).toBe(item.expected)
    })
  })
})

describe("should test userHandler method delete", () => {
  const items = [
    {
      description: "should test ok",
      usecase: (): UserUsecaseInterface => mock<UserUsecaseInterface>(),
      url: 'http://localhost/users/1',
      method: 'DELETE',
      body: null,
      expected: 204
    },
    {
      description: "should test usecase error",
      usecase: (): any => mock<UserUsecaseInterface>().getById.mockImplementationOnce(() => {
        throw new Error();
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
            method: item.method
          }
        )
      })
      const response = await router.run(event)

      expect(response.status).toBe(item.expected)
    })
  })
})
