import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
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
  start_at!: Date;

  @Column('timestamp')
  @Field(() => String)
  end_at!: Date;

  @Column({ default: false })
  @Field(() => Boolean)
  is_done!: boolean;

  @Column()
  @Field(() => String)
  color!: string;

  @Column()
  @Field(() => String)
  status!: string;

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  user!: User;

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  interpreter!: User;
}
