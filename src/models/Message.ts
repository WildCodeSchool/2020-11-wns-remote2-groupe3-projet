import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  date!: Timestamp;

  @ManyToOne(() => User, (user) => user.senderMessages)
  sender!: User;

  @ManyToOne(() => User, (user) => user.receiverMessages)
  receiver!: User;
}
