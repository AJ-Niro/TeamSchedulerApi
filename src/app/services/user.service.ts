import { UserRepository } from '@app/repositories/user.repository'
import UserEntity from '@database/entities/user.entity'
import { CreateUserDTO } from '@app/dtos/user.dto'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll()
  }

  async createUser(userData: CreateUserDTO): Promise<UserEntity> {
    const userNewRecord = new UserEntity()
    userNewRecord.name = userData.name
    return this.userRepository.create(userNewRecord)
  }
}
