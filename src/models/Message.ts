import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Timestamp,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import User from './User';

@Entity()
@ObjectType()
export default class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  content!: string;

  @Column()
  @Field(() => Date)
  date!: Timestamp;

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  sender_id!: User;

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  receiver_id!: User;
}
