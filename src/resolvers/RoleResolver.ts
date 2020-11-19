import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import CreateRoleInput from '../inputs/CreateRoleInput';
import Role from '../models/Role';

@Resolver()
export default class RoleResolver {
  @Query(() => [Role])
  roles(): Promise<Role[]> {
    return Role.find();
  }

  @Query(() => Role)
  role(@Arg('id') id: string): Promise<Role | undefined> {
    return Role.findOne(id);
  }

  @Mutation(() => Role)
  async createRole(@Arg('data') data: CreateRoleInput): Promise<Role> {
    const role = Role.create(data);
    await role.save();
    return role;
  }
}
