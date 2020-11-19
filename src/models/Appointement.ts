import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';
import User from './User';

@Entity()
@ObjectType()
export default class Appointement extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  title!: string;

  @Column('timestamp')
  @Field(() => String)
  start_at!: Timestamp;

  @Column('timestamp')
  @Field(() => String)
  end_at!: Timestamp;

  @Column({ default: false })
  @Field(() => Boolean)
  is_done!: boolean;

  @Column()
  @Field(() => String)
  color!: string;

  @Column()
  @Field(() => String)
  status!: string;

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  user_id!: User;

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  interpreter_id!: User;
}
