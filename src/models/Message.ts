import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
  JoinColumn,
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

  @Column({ name: 'sender' })
  @Field()
  senderId!: string;

  @Field(() => User)
  sender!: User;
  @ManyToOne(() => User, (user) => user.senderMessageConnection)
  @JoinColumn({ name: 'sender' })
  senderConnection!: User;

  @Column({ name: 'receiver' })
  @Field()
  receiverId!: string;

  @Field(() => User)
  receiver!: User;
  @ManyToOne(() => User, (user) => user.receiverMessageConnection)
  @JoinColumn({ name: 'receiver' })
  receiverConnection!: User;
}
