import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import CreateUserInput from '../inputs/CreateUserInput';
import UpdateUserInput from '../inputs/UpdateUserInput';
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
        const promise = data.languagesId.map(async (language) => {
          const lang = await Language.findOne(language);
          if (lang) {
            return lang;
          }
        });
        user.languages = await Promise.all(promise);
      }
      await user.save();
      return user;
    }
    throw new Error('Something went wrong');
  }

  @Mutation(() => User)
  async updateUser(@Arg('data') data: UpdateUserInput): Promise<User> {
    const user = await User.findOne(data.id);
    if (user) {
      if (data.firstname) {
        user.firstname = data.firstname;
      }
      if (data.lastname) {
        user.lastname = data.lastname;
      }
      if (data.email) {
        user.email = data.email;
      }
      if (data.password) {
        user.password = data.password;
      }
      if (data.roleId) {
        const role = await Role.findOne(data.roleId);
        if (role) {
          user.role = role;
        }
      }
      if (data.adress) {
        user.address = data.adress;
      }
      if (data.phone_number) {
        user.phone_number = data.phone_number;
      }
      if (data.picture) {
        user.picture = data.picture;
      }
      await user.save();
      return user;
    }
    throw new Error(`User with id ${data.id} does not exists.`);
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
