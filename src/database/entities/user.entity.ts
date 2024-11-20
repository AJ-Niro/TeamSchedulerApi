import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
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
