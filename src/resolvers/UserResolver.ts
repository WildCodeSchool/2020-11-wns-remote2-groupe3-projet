import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import CreateUserInput from '../inputs/CreateUserInput';
import User from '../models/User';

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
    const user = User.create(data);
    await user.save();
    return user;
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
