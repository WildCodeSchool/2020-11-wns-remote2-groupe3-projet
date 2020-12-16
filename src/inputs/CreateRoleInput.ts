import { InputType, Field } from 'type-graphql';
import Role from '../models/Role';

@InputType()
export default class CreateRoleInput implements Partial<Role> {
  @Field()
  role!: string;
}
