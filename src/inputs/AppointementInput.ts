import { Field, InputType } from 'type-graphql';
import Appointement from '../models/Appointement';

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
  userId!: string;

  @Field()
  interpreterId!: string;
}

@InputType()
export class UpdateAppointementInput implements Partial<Appointement> {
  @Field()
  id!: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  start_at?: Date;

  @Field({ nullable: true })
  end_at?: Date;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  is_done?: boolean;
}
