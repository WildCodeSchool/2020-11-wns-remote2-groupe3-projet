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

  @ManyToOne(() => Role, (role) => role.users, {
    cascade: true,
  })
  role!: Role;

  @ManyToMany(() => Language, (language) => language.users, {
    cascade: true,
  })
  @JoinTable()
  languages!: Language[];

  @Column({
    nullable: true,
  })
  @Field(() => String)
  address?: string;

  @Column({
    nullable: true,
  })
  @Field(() => String)
  phone_number?: string;

  @Column({
    nullable: true,
  })
  @Field(() => String)
  picture?: string;
}
