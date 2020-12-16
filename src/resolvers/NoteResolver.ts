import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import CreateNoteInput from '../inputs/CreateNoteInput';
import Note from '../models/Note';

@Resolver()
export default class NoteResolver {
  @Query(() => [Note])
  notes(): Promise<Note[]> {
    return Note.find();
  }

  @Query(() => Note)
  note(@Arg('id') id: string): Promise<Note | undefined> {
    return Note.findOne(id);
  }

  @Mutation(() => Note)
  async createNote(@Arg('data') data: CreateNoteInput): Promise<Note> {
    const note = Note.create(data);
    await note.save();
    return note;
  }

  @Mutation(() => Note)
  async deletedNote(@Arg('id') id: string): Promise<Note> {
    const deletedNote = await Note.findOne(id);
    if (deletedNote) {
      await Note.remove(deletedNote);
      return deletedNote;
    }
    throw new Error('Note not found');
  }
}
