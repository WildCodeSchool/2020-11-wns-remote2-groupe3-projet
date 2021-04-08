import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import NoteInput from '../inputs/NoteInput';
import Appointement from '../models/Appointement';
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
  async createNote(@Arg('data') data: NoteInput): Promise<Note> {
    const note = Note.create(data);
    const appointement = await Appointement.findOne({
      where: { id: data.appointementId },
    });
    if (appointement) note.appointement = appointement;
    else {
      throw new Error('Appointement not found.');
    }
    await note.save();
    return note;
  }

  @Mutation(() => Note)
  async deleteNote(@Arg('id') id: string): Promise<string> {
    const deletedNote = await Note.findOne(id);
    if (deletedNote) {
      await Note.remove(deletedNote);
      return 'The specified note has been removed.';
    }
    throw new Error('Note not found');
  }
}
