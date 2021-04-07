import { getConnection } from 'typeorm';

import Note from '../models/Note';
import User from '../models/User';
import Appointement from '../models/Appointement';

import initializeTestClient from '../services/InitializeTestClient';

describe('Note resolvers', () => {
  let testClient: any;
  beforeEach(async () => {
    testClient = await initializeTestClient();

    const user1 = User.create({
      firstname: 'Baptiste',
      lastname: 'Gislot',
      email: 'b.g@gmail.com',
      password: 'tototata',
    });
    await user1.save();

    const user2 = User.create({
      firstname: 'Hélèna',
      lastname: 'Thomassin',
      email: 't.h@gmail.com',
      password: 'tototata',
    });
    await user2.save();

    const appointement1 = Appointement.create({
      title: 'RDV',
      start_at: new Date(Date.now()),
      end_at: new Date(Date.now() + 50),
      is_done: false,
      color: '#333333',
      status: 'test',
      user: user1,
      interpreter: user2,
    });
    await appointement1.save();

    const appointement2 = Appointement.create({
      title: 'RDV',
      start_at: new Date(Date.now()),
      end_at: new Date(Date.now() + 50),
      is_done: false,
      color: '#333333',
      status: 'test2',
      user: user2,
      interpreter: user1,
    });
    await appointement2.save();

    const note1 = Note.create({
      note: 5,
      comment: "C'était cool !",
      appointement: appointement1,
    });
    await note1.save();

    const note2 = Note.create({
      note: 3,
      comment: "C'était moins cool...",
      appointement: appointement2,
    });
    await note2.save();
  });

  afterEach(() => {
    const connection = getConnection();
    return connection.close();
  });

  describe('Query all notes', () => {
    it('Returns all notes', async () => {
      const response = await testClient.post('/graphql').send({
        query: `{
					notes {
						id
						note
						comment
					}
				}`,
      });
      expect(JSON.parse(response.text).data).toEqual({
        notes: [
          {
            id: '1',
            note: 5,
            comment: "C'était cool !",
          },
          {
            id: '2',
            note: 3,
            comment: "C'était moins cool...",
          },
        ],
      });
    });
  });

  describe('Query one specific note', () => {
    it('Returns the note associated to the specified ID', async () => {
      const response = await testClient.post('/graphql').send({
        query: `{
          note(id: "1") {
            id
            note
            comment
          }
        }`,
      });
      expect(JSON.parse(response.text).data).toEqual({
        note: {
          id: '1',
          note: 5,
          comment: "C'était cool !",
        },
      });
    });
  });

  describe('Mutation createNote', () => {
    it('Creates a note', async () => {
      const response = await testClient.post('/graphql').send({
        query: `mutation {
          createNote(
            note: 4
            comment: "Top !"
          ){
            id
            note
            comment
          }
        }`,
      });
      expect(JSON.parse(response.text).data).toEqual({});
    });
  });

  describe('Mutation deleteNote', () => {
    it('Delete the specified note.', async () => {
      const response = await testClient.post('/graphql').send({
        query: `mutation {
          deleteNote(
            id: "2"
          )
        }`,
      });
      expect(await Note.count({})).toEqual(1);
      expect(JSON.parse(response.text).data).toEqual({
        deleteNote: 'The specified note has been removed.',
      });
    });
  });
});
