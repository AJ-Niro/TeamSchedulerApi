import { UserRepository } from '../repositories/user.repository'
import UserEntity from '../../database/entities/user.entity'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll()
  }

  async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepository.create(userData)
  }
}
