import { ObjectLiteral, Repository } from 'typeorm'

export const mockRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
} as unknown as jest.Mocked<Repository<ObjectLiteral>>

export const AppDataSource = {
  getRepository: jest.fn().mockImplementation(() => mockRepository),
}
