/*
 * GQL
 * User Authentication Mutation.
 *
 */

import { gql } from '@apollo/client';

const AUTH_USER = gql`
  mutation CreateSession($credentials: CreateSessionInput!) {
    createSession(credentials: $credentials) {
      email
    }
  }
`;

export default AUTH_USER;
