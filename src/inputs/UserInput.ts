import { InputType, Field } from 'type-graphql';
import User from '../models/User';

@InputType()
export class UpdateUserInfoInput implements Partial<User> {
  @Field()
  id!: string;
  @Field({ nullable: true })
  firstname?: string;
  @Field({ nullable: true })
  lastname?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  password?: string;
  @Field({ nullable: true })
  address?: string;
  @Field({ nullable: true })
  phone_number?: string;
  @Field({ nullable: true })
  picture?: string;
}

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  firstname!: string;
  @Field()
  lastname!: string;
  @Field()
  email!: string;
  @Field()
  password!: string;
  @Field(() => String)
  roleId!: string;
  @Field(() => [String])
  languagesId?: string[];
  @Field({ nullable: true })
  adress?: string;
  @Field({ nullable: true })
  phone_number?: string;
  @Field({ nullable: true })
  picture?: string;
}

@InputType()
export class SetUserRoleInput implements Partial<User> {
  @Field()
  id!: string;
  @Field(() => String)
  roleId!: string;
}

@InputType()
export class SetUserLanguageInput implements Partial<User> {
  @Field()
  id!: string;
  @Field(() => [String])
  languagesId!: string[];
}
