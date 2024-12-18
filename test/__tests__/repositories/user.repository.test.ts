import { UserRepository } from '@app/repositories/user.repository'
import UserEntity from '@database/entities/user.entity'
import { Repository } from 'typeorm'
import { AppDataSource } from '@config/typeorm.config'

// Mock the TypeORM repository and AppDataSource
jest.mock('@config/typeorm.config', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}))

describe('UserRepository', () => {
  let userRepository: UserRepository
  let mockRepository: jest.Mocked<Repository<UserEntity>>

  beforeEach(() => {
    // Create a mock repository
    mockRepository = {
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<UserEntity>>

    // Mock AppDataSource.getRepository to return the mock repository
    ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)

    // Initialize UserRepository
    userRepository = new UserRepository()
  })

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers: UserEntity[] = [
        { id: 1, name: 'Alice' } as UserEntity,
        { id: 2, name: 'Bob' } as UserEntity,
      ]

      // Mock the find method
      mockRepository.find.mockResolvedValue(mockUsers)

      const result = await userRepository.findAll()

      expect(result).toEqual(mockUsers)
      expect(mockRepository.find.mock.calls.length).toBe(1)
    })
  })

  describe('create', () => {
    it('should create and save a user', async () => {
      const userData = { name: 'Charlie' }
      const savedUser = { id: 3, ...userData } as UserEntity

      // Mock create and save methods
      mockRepository.create.mockReturnValue(savedUser)
      mockRepository.save.mockResolvedValue(savedUser)

      const result = await userRepository.create(userData)
      expect(result).toEqual(savedUser)

      const createUserCallArg = mockRepository.create.mock
        .calls[0][0] as Partial<UserEntity>
      expect(createUserCallArg).toEqual(userData)

      const saveUserCallArg = mockRepository.save.mock.calls[0][0] as UserEntity
      expect(saveUserCallArg).toEqual(savedUser)
    })
  })
})
