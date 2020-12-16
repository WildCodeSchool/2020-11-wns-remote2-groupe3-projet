import { InputType, Field } from 'type-graphql';
import User from '../models/User';

@InputType()
export default class CreateUserInput implements Partial<User> {
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
