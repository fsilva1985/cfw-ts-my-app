import { Router } from 'worktop'
import { UserHandler } from './user'
import { UserUsecaseInterface } from '../../../usecase/user'
import { mock } from 'jest-mock-extended'

test('Should return status response usign handler get()', async () => {
  const router = new Router()
  const usecase = mock<UserUsecaseInterface>()
  new UserHandler(router, usecase)
  const event = new FetchEvent('fetch', { request: new Request('http://localhost/users/1', { method: 'GET' }) })
  const response = await router.run(event)

  expect(response.status).toBe(200)
})

test('Should return status response usign getAll()', async () => {
  const router = new Router()
  const usecase = mock<UserUsecaseInterface>()
  new UserHandler(router, usecase)
  const event = new FetchEvent('fetch', { request: new Request('http://localhost/users', { method: 'GET' }) })
  const response = await router.run(event)

  expect(response.status).toBe(200)
})

test('Should return status response usign create()', async () => {
  const router = new Router()
  const usecase = mock<UserUsecaseInterface>()
  new UserHandler(router, usecase)
  const event = new FetchEvent('fetch', { request: new Request('http://localhost/users', { method: 'POST' }) })
  const response = await router.run(event)

  expect(response.status).toBe(201)
})

test('Should return status response usign update()', async () => {
  const router = new Router()
  const usecase = mock<UserUsecaseInterface>()
  new UserHandler(router, usecase)
  const event = new FetchEvent('fetch', { request: new Request('http://localhost/users', { method: 'PUT' }) })
  const response = await router.run(event)

  expect(response.status).toBe(204)
})

test('Should return status response usign delete()', async () => {
  const router = new Router()
  const usecase = mock<UserUsecaseInterface>()
  new UserHandler(router, usecase)
  const event = new FetchEvent('fetch', { request: new Request('http://localhost/users/1', { method: 'DELETE' }) })
  const response = await router.run(event)

  expect(response.status).toBe(204)
})
