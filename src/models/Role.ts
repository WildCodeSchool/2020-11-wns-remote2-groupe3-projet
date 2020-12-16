import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';
import User from './User';

@Entity()
@ObjectType()
export default class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  role!: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
