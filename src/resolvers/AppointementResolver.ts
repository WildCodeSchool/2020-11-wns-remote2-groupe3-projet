import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateAppointementInput,
  UpdateAppointementInput,
} from '../inputs/AppointementInput';
import Appointement from '../models/Appointement';
import User from '../models/User';

@Resolver()
export default class AppointementResolver {
  @Query(() => [Appointement])
  appointements(): Promise<Appointement[]> {
    return Appointement.find();
  }

  @Query(() => Appointement)
  appointement(@Arg('id') id: string): Promise<Appointement | undefined> {
    return Appointement.findOne(id);
  }

  @Query(() => [Appointement])
  userAppointements(
    @Arg('id') id: string
  ): Promise<Appointement[] | undefined> {
    return Appointement.find({ where: { user: id } });
  }

  @Query(() => [Appointement])
  interpreterAppointements(
    @Arg('id') id: string
  ): Promise<Appointement[] | undefined> {
    return Appointement.find({ where: { interpreter: id } });
  }

  @Mutation(() => Appointement)
  async createAppointement(
    @Arg('data') data: CreateAppointementInput
  ): Promise<Appointement> {
    const appointement = Appointement.create(data);
    const user = await User.findOne(data.user);
    const interpreter = await User.findOne(data.interpreter);

    if (user) {
      appointement.user = user;
    } else {
      throw new Error('User does not exists');
    }
    if (interpreter) {
      appointement.interpreter = interpreter;
    } else {
      throw new Error('Interpreter does not exists');
    }

    appointement.save();
    return appointement;
  }

  @Mutation(() => Appointement)
  async updateAppointement(
    @Arg('data') data: UpdateAppointementInput
  ): Promise<Appointement> {
    await Appointement.update(data.id, data);
    const appointement = Appointement.findOne(data.id);
    if (appointement) appointement;
    throw new Error('Appointement not found');
  }

  @Mutation(() => Appointement)
  async deleteAppointement(@Arg('id') id: string): Promise<Appointement> {
    const appointement = await Appointement.findOne(id);
    if (appointement) {
      await Appointement.remove(appointement);
      return appointement;
    }
    throw new Error('Appointement not found');
  }
}
