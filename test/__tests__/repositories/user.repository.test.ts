import { UserRepository } from '@app/repositories/user.repository'
import UserEntity from '@database/entities/user.entity'
import { mockRepository } from '@test/__mocks__/config/typeorm.config.mock'

describe('UserRepository', () => {
  let userRepository: UserRepository

  beforeEach(() => {
    // Reset mock call counts before each test
    jest.clearAllMocks()
    // Initialize UserRepository
    userRepository = new UserRepository()
  })

  describe('findAll', () => {
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

      // Mock the find method
      mockRepository.find.mockResolvedValue(mockUsers)

      const result = await userRepository.findAll()

      expect(result).toEqual(mockUsers)
      expect(mockRepository.find.mock.calls.length).toBe(1)
    })
  })

  describe('create', () => {
    it('should create and save a user', async () => {
      const userData = {
        email: 'charlie@test.com',
        first_name: 'Charlie',
        last_name: 'Goodman',
      } as Partial<UserEntity>
      const savedUser = { id: 3, ...userData } as UserEntity

      // Mock create and save methods
      mockRepository.create.mockReturnValue(savedUser)
      mockRepository.save.mockResolvedValue(savedUser)

      const result = await userRepository.create(userData)
      expect(result).toEqual(savedUser)

      const [createUserCallArg] = mockRepository.create.mock.calls[0] as [
        Partial<UserEntity>,
      ]
      expect(createUserCallArg).toEqual(userData)

      const [saveUserCallArg] = mockRepository.save.mock.calls[0] as [
        UserEntity,
      ]
      expect(saveUserCallArg).toEqual(savedUser)
    })
  })
})
