import createTestClient from 'supertest';
import { createConnection, getConnection } from 'typeorm';

import { getExpressServer } from '../express-server';

import UserSession from '../models/UserSession';
import User from '../models/User';
import Role from '../models/Role';
import Language from '../models/Language';
import Message from '../models/Message';
import Note from '../models/Note';
import Appointement from '../models/Appointement';

describe('User resolvers', () => {
  let testClient: createTestClient.SuperTest<createTestClient.Test>;

  beforeEach(async () => {
    await createConnection({
      type: 'postgres',
      url: 'postgres://postgres:postgres@localhost:5432/deafstudy_test',
      dropSchema: true,
      synchronize: true,
      logging: false,
      entities: [
        User,
        UserSession,
        Role,
        Language,
        Message,
        Note,
        Appointement,
      ],
    });

    const { expressServer } = await getExpressServer();
    testClient = createTestClient(expressServer);

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

    const message1 = Message.create();
    message1.content = 'Salut !';
    message1.sender = user1;
    message1.receiver = user2;
    await message1.save();

    const message2 = Message.create();
    message2.content = 'Coucou ! ça va ?';
    message2.sender = user2;
    message2.receiver = user1;
    await message2.save();
  });

  afterEach(() => {
    const connection = getConnection();
    return connection.close();
  });

  describe('Query all messages', () => {
    it('Returns all messages exchanged between two users', async () => {
      const response = await testClient.post('/graphql').send({
        query: `{
          allMessages(
            data: {
              senderId: "1"
              receiverId: "2"
            }
          ) {
            id
            content
          }
        }`,
      });

      expect(JSON.parse(response.text).data).toEqual({
        allMessages: [
          {
            id: '1',
            content: 'Salut !',
          },
          {
            id: '2',
            content: 'Coucou ! ça va ?',
          },
        ],
      });
    });
  });

  describe('Mutation create message', () => {
    it('Create and save a message in the DB and returns it.', async () => {
      const response = await testClient.post('/graphql').send({
        query: `mutation {
          createMessage(
            data: {
              senderId: "1"
              receiverId: "2"
              content: "Hello World !"
            }
          ) {
            id
            content
          }
        }`,
      });

      expect(await Message.count({})).toEqual(3);
      expect(JSON.parse(response.text).data).toEqual({
        createMessage: {
          id: '3',
          content: 'Hello World !',
        },
      });
    });
  });

  describe('Mutation delete message', () => {
    it('Delete the specified message from the DB.', async () => {
      const response = await testClient.post('/graphql').send({
        query: `mutation {
          deleteMessage(
            id: "2"
          )
        }`,
      });

      expect(await Message.count({})).toEqual(1);
      expect(JSON.parse(response.text).data).toEqual({
        deleteMessage: 'Message deleted with success.',
      });
    });
  });
});
