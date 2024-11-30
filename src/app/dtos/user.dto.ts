import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name!: string
}
