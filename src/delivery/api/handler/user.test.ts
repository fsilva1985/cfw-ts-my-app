import { Router } from 'worktop'
import { UserHandler } from './user'
import { UserUsecaseInterface } from '../../../usecase/user'
import { mock } from 'jest-mock-extended';

test('Tests /users GET request', async () => {
  const router = new Router()
  const usecase = mock<UserUsecaseInterface>() as UserUsecaseInterface;
  new UserHandler(router, usecase)
  const event = new FetchEvent('fetch', { request: new Request('http://localhost/users', { method: 'GET' }) })
  const response = await router.run(event)

  expect(response.status).toBe(200)
})

test('Tests /users POST request', async () => {
  const router = new Router()
  const usecase = mock<UserUsecaseInterface>() as UserUsecaseInterface;
  new UserHandler(router, usecase)
  const event = new FetchEvent('fetch', {
    request: new Request('http://localhost/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "firstName": "John",
        "lastName": "Doe",
        "age": 30
      })
    })
  })
  const response = await router.run(event)

  expect(response.status).toBe(201)
})

test('Tests /users PUT request', async () => {
  const router = new Router()
  const usecase = mock<UserUsecaseInterface>() as UserUsecaseInterface;
  new UserHandler(router, usecase)
  const event = new FetchEvent('fetch', {
    request: new Request('http://localhost/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "firstName": "John",
        "lastName": "Doe",
        "age": 30
      })
    })
  })
  const response = await router.run(event)

  expect(response.status).toBe(204)
})