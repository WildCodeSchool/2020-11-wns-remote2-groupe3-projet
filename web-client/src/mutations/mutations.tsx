/*
 * GQL
 * Mutations.
 *
 */

import { gql } from '@apollo/client';

export const AUTH_USER = gql`
  mutation CreateSession($credentials: CreateSessionInput!) {
    createSession(credentials: $credentials) {
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      firstname
      lastname
      email
    }
  }
`;
