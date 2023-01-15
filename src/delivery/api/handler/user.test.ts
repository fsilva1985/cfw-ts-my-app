import { Router } from 'worktop'
import { UserHandler } from './user'
import { jest } from '@jest/globals'
import { UserUsecaseInterface } from '../../../usecase/user'

test('Tests /users GET request', async () => {
  const router = new Router()
  const usecase = { getAll: jest.fn() } as UserUsecaseInterface
  new UserHandler(router, usecase)
  const event = new FetchEvent('fetch', { request: new Request('http://localhost/users', { method: 'GET' }) })
  const response = await router.run(event)

  expect(response.status).toBe(200)
})