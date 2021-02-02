import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import Appointement from './Appointement';

@Entity()
@ObjectType()
export default class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => Number)
  note!: number;

  @Column()
  @Field(() => String)
  comment!: string;

  @OneToOne(() => Appointement)
  @JoinColumn()
  @Field(() => Appointement)
  appointement!: Appointement;
}
