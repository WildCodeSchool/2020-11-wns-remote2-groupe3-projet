import { InputType, Field } from 'type-graphql';
import Note from '../models/Note';

@InputType()
export default class NoteInput implements Partial<Note> {
  @Field()
  note!: number;
  @Field()
  comment?: string;
  @Field()
  appointementId!: string;
}
