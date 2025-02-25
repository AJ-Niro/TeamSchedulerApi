import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDTO {
  @IsString({ message: 'Email must be a String' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string

  @IsString({ message: 'First name must be a String' })
  @IsNotEmpty({ message: 'First name is required' })
  first_name!: string

  @IsString({ message: 'Last name must be a String' })
  @IsNotEmpty({ message: 'Last name is required' })
  last_name!: string
}
