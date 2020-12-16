import { InputType, Field } from 'type-graphql';
import User from '../models/User';

@InputType()
export default class UpdateUserInput implements Partial<User> {
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
  @Field(() => String, {
    nullable: true,
  })
  roleId?: string;
  @Field(() => [String], {
    nullable: true,
  })
  languagesId?: string[];
  @Field({ nullable: true })
  adress?: string;
  @Field({ nullable: true })
  phone_number?: string;
  @Field({ nullable: true })
  picture?: string;
}
