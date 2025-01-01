import UserController from '@app/controllers/user.controller'
import { UserService } from '@app/services/user.service'
import { Request, Response } from 'express'
import { CreateUserDTO } from '@app/dtos/user.dto'

describe('UserController', () => {
  let userController: UserController
  let mockUserService: jest.Mocked<UserService>
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>

  beforeEach(() => {
    mockUserService = {
      getAllUsers: jest.fn(),
      createUser: jest.fn(),
    } as unknown as jest.Mocked<UserService>

    userController = new UserController(mockUserService)

    mockRequest = {}
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  describe('getAllUsers', () => {
    it('should return a list of users with status 200', async () => {
      const mockUsers = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]

      mockUserService.getAllUsers.mockResolvedValue(mockUsers)

      await userController.getAllUsers(
        mockRequest as Request,
        mockResponse as Response,
      )

      expect(mockUserService.getAllUsers.mock.calls.length).toBe(1)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith(mockUsers)
    })
  })

  describe('createUser', () => {
    it('should create a user and return it with status 201', async () => {
      const mockUserData = { name: 'Charlie' }
      const mockUser = { id: 3, name: 'Charlie' }

      mockRequest.body = mockUserData

      mockUserService.createUser.mockResolvedValue(mockUser)

      await userController.createUser(
        mockRequest as Request<unknown, unknown, { name: string }>,
        mockResponse as Response,
      )

      const [createUserCallArg] = mockUserService.createUser.mock.calls[0] as [
        CreateUserDTO,
      ]

      expect(createUserCallArg).toEqual(mockUserData)
      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser)
    })
  })
})
