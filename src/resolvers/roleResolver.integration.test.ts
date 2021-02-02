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

describe('Role resolvers', () => {
  let testClient: createTestClient.SuperTest<createTestClient.Test>;

  beforeEach(async () => {
    await createConnection({
      type: 'postgres',
      url:
        'postgres://helenathomassin:Jaimemesenfants2@localhost:5432/deafstudy_test',
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

    const role1 = Role.create({
      role: 'admin',
    });

    const role2 = Role.create({
      role: 'interpreter',
    });

    const role3 = Role.create({
      role: 'user',
    });

    afterEach(() => {
      const connection = getConnection();
      return connection.close();
    });

    describe('Query all roles', () => {
      it('Return all roles', async () => {
        const response = await testClient.post('/graphql').send({
          query: `{
            roles {
              id
              role
            }
          }
          `,
        });

        expect(JSON.parse(response.text).data).toEqual({
          roles: [
            {
              id: '1',
              role: 'admin',
            },
            {
              id: '2',
              role: 'interpreter',
            },
            {
              id: '3',
              role: 'user',
            },
          ],
        });
      });
    });
  });
});
