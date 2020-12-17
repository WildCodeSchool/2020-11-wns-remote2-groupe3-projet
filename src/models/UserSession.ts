import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import User from './User';

@Entity()
@ObjectType()
export default class UserSession extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Index()
  @Column()
  @Generated('uuid')
  sessionId!: string;

  @ManyToOne(() => User)
  user!: User;
}
