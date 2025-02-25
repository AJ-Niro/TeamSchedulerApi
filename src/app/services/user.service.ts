import { injectable, inject } from 'inversify'
import { UserRepository } from '@app/repositories/user.repository'
import UserEntity from '@database/entities/user.entity'
import { CreateUserDTO } from '@app/dtos/user.dto'
import TYPES from '@config/inversify.types'

@injectable()
export class UserService {
  private userRepository: UserRepository

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll()
  }

  async createUser(userData: CreateUserDTO): Promise<UserEntity> {
    const userNewRecord = new UserEntity()
    userNewRecord.email = userData.email
    userNewRecord.first_name = userData.first_name
    userNewRecord.last_name = userData.last_name
    return this.userRepository.create(userNewRecord)
  }
}
