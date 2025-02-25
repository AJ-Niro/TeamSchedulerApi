import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('user')
export default class UserEntity {
  @PrimaryColumn({
    type: 'bigint',
  })
  id!: number

  @Column({
    type: 'varchar',
  })
  email!: string

  @Column({
    type: 'varchar',
  })
  first_name!: string

  @Column({
    type: 'varchar',
  })
  last_name!: string
}
