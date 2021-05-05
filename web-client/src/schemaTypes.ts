/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBooks
// ====================================================

export interface GetBooks_books {
  __typename: "Book";
  id: string;
  title: string;
}

export interface GetBooks {
  books: GetBooks_books[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBookDetails
// ====================================================

export interface GetBookDetails_book {
  __typename: "Book";
  id: string;
  title: string;
  author: string;
  isPublished: boolean;
}

export interface GetBookDetails {
  book: GetBookDetails_book;
}

export interface GetBookDetailsVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================


// ====================================================
// User Login
// ====================================================
export default interface IUserLogin {
  username: string;
  password: string;
}


// ====================================================
// User SignUp
// ====================================================

  type UserSignUpForm = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roleId: string;
  languagesId: string;
  adress: string;
  phone_number: string;
  picture: string;
  }

 