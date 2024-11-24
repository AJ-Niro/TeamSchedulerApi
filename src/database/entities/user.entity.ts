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
  name!: string
}
