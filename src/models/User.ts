import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Role from './Role';
import Language from './Language';
import bcrypt from 'bcrypt';
import Message from './Message';
import Appointement from './Appointement';

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

  @Column({ unique: true })
  @Field(() => String)
  email!: string;

  @Column()
  password!: string;

  @ManyToOne(() => Role, (role) => role.users, {
    cascade: true,
  })
  role!: Role;

  @ManyToMany(() => Language)
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

  @OneToMany(() => Message, (message) => message.sender)
  senderMessages?: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receiverMessages?: Message[];

  @OneToMany(() => Appointement, (appointement) => appointement.user)
  appointements?: Appointement[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.HASH_SALT)
    );
  }
}
