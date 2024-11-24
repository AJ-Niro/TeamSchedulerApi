import { Repository } from 'typeorm'
import UserEntity from '../../database/entities/user.entity'
import { AppDataSource } from '../../config/typeorm.config'

export class UserRepository {
  private repository: Repository<UserEntity>

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity)
  }

  async findAll(): Promise<UserEntity[]> {
    return this.repository.find()
  }

  async create(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.repository.create(userData)
    return this.repository.save(user)
  }
}
