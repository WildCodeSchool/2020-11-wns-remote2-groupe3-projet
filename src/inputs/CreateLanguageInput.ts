import { Field, InputType } from 'type-graphql';
import Language from '../models/Language';

@InputType()
export default class CreateLanguageInput implements Partial<Language> {
  @Field()
  language!: string;
}
