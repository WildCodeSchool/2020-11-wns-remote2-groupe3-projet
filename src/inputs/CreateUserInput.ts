import { InputType, Field } from 'type-graphql';
import User from '../models/User';
import Role from '../models/Role';
import Language from '../models/Language';
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
  @Field()
  role!: Role;
  @Field()
  languages!: [Language];
  @Field({ nullable: true })
  adress?: string;
  @Field({ nullable: true })
  phone_number?: string;
  @Field({ nullable: true })
  picture?: string;
}
