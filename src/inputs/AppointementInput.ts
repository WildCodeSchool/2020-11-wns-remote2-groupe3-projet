import { Field, InputType } from 'type-graphql';
import Appointement from '../models/Appointement';
import User from '../models/User';

@InputType()
export class CreateAppointementInput implements Partial<Appointement> {
  @Field()
  title!: string;

  @Field()
  start_at!: Date;

  @Field()
  end_at!: Date;

  @Field()
  color!: string;

  @Field()
  status!: string;

  @Field()
  user!: User;

  @Field()
  interpreter!: User;
}

@InputType()
export class UpdateAppointementInput implements Partial<Appointement> {
  @Field()
  id!: string;

  @Field()
  title?: string;

  @Field()
  start_at?: Date;

  @Field()
  end_at?: Date;

  @Field()
  color?: string;

  @Field()
  status?: string;

  @Field()
  is_done?: boolean;
}
