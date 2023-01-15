import { Router } from 'worktop'
import { UserHandler } from '../src/delivery/api/handler/user'
import {jest} from '@jest/globals'

test('homepage route should return "Homepage"', async () => {
  // Inicialize o roteador
  const router = new Router();

  const testUsers = [{ "id": 1, "firstName": "Timber", "lastName": "Saw", "age": 25 }];

  const usecase = {
    getUsers: jest.fn().mockReturnValue(testUsers)
  };

  new UserHandler(router, usecase)

  const event = new FetchEvent('fetch', { request: new Request('http://localhost/users', { method: 'GET' }) })
  const response = await router.run(event);

  expect(await response.json()).toEqual(testUsers)
});