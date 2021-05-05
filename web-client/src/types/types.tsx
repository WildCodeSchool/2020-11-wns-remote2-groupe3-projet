export type CreateUserInput = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roleId: string;
  languagesId: string;
  adress: string;
  phone_number: string;
  picture: string;
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  phone_number: string;
  picture: string;
};

export type CreateSessionInput = {
  email: string;
  password: string;
};
