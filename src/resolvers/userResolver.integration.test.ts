import createTestClient from 'supertest';
import { createConnection, getConnection } from 'typeorm';

import { getExpressServer } from '../express-server';
import UserSession from '../models/UserSession';
import User from '../models/User';

describe('User resolvers', () => {
  let testClient: createTestClient.SuperTest<createTestClient.Test>;

  beforeEach(async () => {
    await createConnection({
      type: 'postgres',
      database: 'deafstudy',
      dropSchema: true,
      entities: [User, UserSession],
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
    it('return all wilders', async () => {
      const user1 = User.create({
        firstname: 'Baptiste',
        lastname: 'Gislot',
        email: 'b.g@gmail.com',
        password: 'tototata',
        roleId: '1',
      });
      await user1.save();

      const user2 = User.create({
        firstname: 'Hélèna',
        lastname: 'Thomassin',
        email: 't.h@gmail.com',
        password: 'tototata',
        roleId: '1',
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
