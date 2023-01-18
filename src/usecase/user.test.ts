import { UserUsecase } from './user'
import { UserRepositoryInterface } from '../repository/user'
import { mock } from 'jest-mock-extended';
import { User as UserEntity } from '../domain/entity/user'

describe("checkUser test", () => {
  const scenarios = [
    {
      description: "User not exists",
      userRepository: (): UserRepositoryInterface => {
        const repositoryMock = mock<UserRepositoryInterface>()

        repositoryMock.getById.mockReturnValue(Promise.resolve({ id: 0 } as UserEntity))

        return repositoryMock
      },
      expected: false
    },
    {
      description: "User exists",
      userRepository: (): UserRepositoryInterface => {
        const repositoryMock = mock<UserRepositoryInterface>()

        repositoryMock.getById.mockReturnValue(Promise.resolve({ id: 1 } as UserEntity))

        return repositoryMock
      },
      expected: true
    }
  ]

  describe("run scenarios", () => {
    scenarios.forEach((item) => {
      it(`scenario ${item.description}`, async () => {
        const usecase = new UserUsecase(item.userRepository())

        expect(await usecase.checkUserById(1)).toEqual(item.expected)
      })
    })
  })
})
