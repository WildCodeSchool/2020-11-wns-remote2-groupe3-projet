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
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [User, UserSession, Role, Language, Message, Appointement],
      synchronize: true,
      logging: false,
    });
    const { expressServer } = await getExpressServer();
    testClient = createTestClient(expressServer);
  });

  afterEach(() => {
    const connection = getConnection();
    return connection.close();
  });

  describe('query all users', () => {
    it('return all users', async () => {
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

      const response = await testClient.post('/graphql').send({
        query: `{
					users {
						id
						firstname
						lastname
						email
					}
				}
				`,
      });

      expect(JSON.parse(response.text).data).toEqual({
        users: [
          {
            id: '1',
            firstname: 'Baptiste',
            lastname: 'Gislot',
            email: 'b.g@gmail.com',
          },
          {
            id: '2',
            firstname: 'Hélèna',
            lastname: 'Thomassin',
            email: 't.h@gmail.com',
          },
        ],
      });
    });
  });
});
