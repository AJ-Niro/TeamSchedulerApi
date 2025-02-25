import { UserService } from '@app/services/user.service'
import { UserRepository } from '@app/repositories/user.repository'
import { CreateUserDTO } from '@app/dtos/user.dto'
import UserEntity from '@database/entities/user.entity'

describe('UserService', () => {
  let userService: UserService
  let mockUserRepository: jest.Mocked<UserRepository>

  beforeEach(() => {
    mockUserRepository = {
      findAll: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>

    userService = new UserService(mockUserRepository)
  })

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers: UserEntity[] = [
        {
          id: 1,
          email: 'alice@test.com',
          first_name: 'Alice',
          last_name: 'Jensen',
        } as UserEntity,
        {
          id: 2,
          email: 'bob@test.com',
          first_name: 'Bob',
          last_name: 'Mueller',
        } as UserEntity,
      ]

      mockUserRepository.findAll.mockResolvedValue(mockUsers)

      const result = await userService.getAllUsers()

      expect(mockUserRepository.findAll.mock.calls.length).toBe(1)
      expect(result).toEqual(mockUsers)
    })
  })

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const userData = new CreateUserDTO()
      userData.email = 'charlie@test.com'
      userData.first_name = 'Charlie'
      userData.last_name = 'Goodman'

      const mockUser: UserEntity = {
        id: 3,
        email: 'charlie@test.com',
        first_name: 'Charlie',
        last_name: 'Goodman',
      } as UserEntity

      mockUserRepository.create.mockResolvedValue(mockUser)

      const result = await userService.createUser(userData)

      const [createUserCallArg] = mockUserRepository.create.mock.calls[0] as [
        Partial<UserEntity>,
      ]

      expect(createUserCallArg).toEqual(userData)

      expect(result).toEqual(mockUser)
    })
  })
})
