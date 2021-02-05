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
      url: 'postgres://postgres:postgres@localhost:5433/deafstudy_test',
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
    await role1.save();

    const role2 = Role.create({
      role: 'interpreter',
    });
    await role2.save();

    const role3 = Role.create({
      role: 'user',
    });
    await role3.save();
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

  describe('Query one specific role', () => {
    it('Return the role associated to the specified ID', async () => {
      const response = await testClient.post('/graphql').send({
        query: `{
          role(id: "2") {
            id
            role
          }
        }
        `,
      });

      expect(JSON.parse(response.text).data).toEqual({
        role: {
          id: '2',
          role: 'interpreter',
        },
      });
    });
  });

  describe('Mutation createRole', () => {
    it('Create and return the role', async () => {
      const response = await testClient.post('/graphql').send({
        query: `mutation {
          createRole(
            data: {
              role: "administrator"
            }
          ) {
            id
            role
          }
        }`,
      });

      expect(await Role.count({})).toEqual(4);
      expect(JSON.parse(response.text).data).toEqual({
        createRole: {
          id: '4',
          role: 'administrator',
        },
      });
    });
  });

  describe('Mutation deleteRole', () => {
    it('Delete the specified role and return it.', async () => {
      const response = await testClient.post('/graphql').send({
        query: `mutation {
          deleteRole(
            id: "2"
          )
        }`,
      });

      expect(await Role.count({})).toEqual(2);
      expect(JSON.parse(response.text).data).toEqual({
        deleteRole: 'Role has been deleted.',
      });
    });
  });
});