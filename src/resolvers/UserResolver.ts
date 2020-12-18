import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import {
  CreateUserInput,
  UpdateUserInfoInput,
  SetUserRoleInput,
  SetUserLanguageInput,
  CreateSessionInput,
} from '../inputs/UserInput';
import User from '../models/User';
import Role from '../models/Role';
import Language from '../models/Language';
import UserSession from '../models/UserSession';
import bcrypt from 'bcrypt';
import { Response } from 'express';

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

  @Query(() => User)
  me(@Ctx() { user }: { user: User | null }): User {
    if (!user) {
      throw new Error('Not authenticated');
    }
    return user;
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    const user = User.create(data);
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
    if (user) user;
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
  async setUserLanguage(
    @Arg('data') data: SetUserLanguageInput
  ): Promise<User> {
    const user = await User.findOne(data.id);
    if (user) {
      const languages = await Language.getRepository().findByIds(
        data.languagesId
      );
      if (languages) {
        user.languages = languages;
      } else {
        throw new Error('Language(s) not found');
      }
      await user.save();
      return user;
    }
    throw new Error('User not found');
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

  @Mutation(() => User)
  async createSession(
    @Arg('credentials') credentials: CreateSessionInput,
    @Ctx() { res }: { res: Response }
  ): Promise<User> {
    const { email, password } = credentials;
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (isPasswordMatching) {
        const session = UserSession.create({ user });
        await session.save();

        res.set('set-cookie', [
          `sessionId=${session.sessionId}; Max-Age=2592000; SameSite=Strict; HttpOnly`,
        ]);

        return user;
      }
      throw new Error('Bad login');
    }
    throw new Error('Bag login');
  }
}
