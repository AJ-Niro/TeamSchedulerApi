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
        { id: 1, name: 'Alice' } as UserEntity,
        { id: 2, name: 'Bob' } as UserEntity,
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
      userData.name = 'Charlie'

      const mockUser: UserEntity = { id: 3, name: 'Charlie' } as UserEntity

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
