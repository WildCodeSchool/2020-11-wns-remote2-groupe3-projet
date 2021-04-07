import { getConnection } from 'typeorm';

import Role from '../models/Role';

import initializeTestClient from '../services/InitializeTestClient';

describe('Role resolvers', () => {
  let testClient: any;

  beforeEach(async () => {
    testClient = await initializeTestClient();

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
