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
    const user = await User.findOne({ where: { id: data.userId } });
    const interpreter = await User.findOne({
      where: { id: data.interpreterId },
    });

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

    await appointement.save();
    return appointement;
  }

  @Mutation(() => Appointement)
  async updateAppointement(
    @Arg('data') data: UpdateAppointementInput
  ): Promise<Appointement> {
    await Appointement.update(data.id, data);
    const appointement = await Appointement.findOne(data.id);
    if (appointement) {
      if (data.title) appointement.title = data.title;
      if (data.start_at) appointement.start_at = data.start_at;
      if (data.end_at) appointement.end_at = data.end_at;
      if (data.color) appointement.color = data.color;
      if (data.status) appointement.status = data.status;
      if (data.is_done) appointement.is_done = data.is_done;
      await appointement.save();
      return appointement;
    }
    throw new Error('Appointement not found');
  }

  @Mutation(() => Appointement)
  async deleteAppointement(@Arg('id') id: string): Promise<string> {
    const appointement = await Appointement.findOne(id);
    if (appointement) {
      await Appointement.remove(appointement);
      return `Appointement ${id} has been deleted successfully`;
    }
    throw new Error('Appointement not found');
  }
}
