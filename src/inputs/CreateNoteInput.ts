import { InputType, Field } from 'type-graphql';
import Note from '../models/Note';

@InputType()
export default class CreateNoteInput implements Partial<Note> {
  @Field()
  note!: number;
  @Field()
  comment?: string;
}
