import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import {
  CreateUserInput,
  UpdateUserInfoInput,
  SetUserRoleInput,
  SetUserLanguageInput,
} from '../inputs/UserInput';
import User from '../models/User';
import Role from '../models/Role';
import Language from '../models/Language';

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User)
  role(@Arg('id') id: string): Promise<User | undefined> {
    return User.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    const user = await User.create(data);
    const role = await Role.findOne(data.roleId);
    if (user) {
      if (role) {
        user.role = role;
      }
      if (data.languagesId) {
        user.languages = await Language.getRepository().findByIds(
          data.languagesId
        );
      }
      await user.save();
      return user;
    }
    throw new Error('Something went wrong');
  }

  @Mutation(() => User)
  async updateUserInfo(@Arg('data') data: UpdateUserInfoInput): Promise<User> {
    await User.update(data.id, data);
    const user = await User.findOne(data.id);
    if (user) {
      return user;
    }
    throw new Error('User not found');
  }

  @Mutation(() => User)
  async setUserRole(@Arg('data') data: SetUserRoleInput): Promise<User> {
    const user = await User.findOne(data.id);
    const role = await Role.findOne(data.roleId);
    if (user) {
      if (role) {
        user.role = role;
      } else {
        throw new Error('Role does not exists');
      }
      await user.save();
      return user;
    }
    throw new Error('User does not exists');
  }

  @Mutation(() => User)
  async deleteUser(@Arg('id') id: string): Promise<User> {
    const deletedUser = await User.findOne(id);
    if (deletedUser !== undefined) {
      await User.remove(deletedUser);
      return deletedUser;
    }
    throw new Error('User not found');
  }
}
