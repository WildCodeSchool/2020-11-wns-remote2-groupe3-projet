import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Role from './Role';
import Language from './Language';

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  firstname!: string;

  @Column()
  @Field(() => String)
  lastname!: string;

  @Column()
  @Field(() => String)
  email!: string;

  @Column()
  @Field(() => String)
  password!: string;

  @ManyToOne(() => Role, (role) => role.role)
  @Field(() => Role)
  role!: Role;

  @ManyToMany(() => Language)
  @JoinTable()
  @Field(() => [Language])
  languages!: Language[];

  @Column()
  @Field(() => String)
  address?: string;

  @Column()
  @Field(() => String)
  phone_number?: string;

  @Column()
  @Field(() => String)
  picture?: string;
}
