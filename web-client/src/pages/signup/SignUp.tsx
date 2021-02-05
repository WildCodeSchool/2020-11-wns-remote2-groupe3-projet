import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../../components/menu/Menu';
import './Signup.scss';
import {
  FloatPasswordLabel,
  UnFloatPasswordLabel,
  FloatUserNameLabel,
  UnFloatUsernameLabel,
} from '../../animations/animations';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import e from 'express';

const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      firstname
      lastname
      email
    }
  }
`;

type CreateUserInput = {
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

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  phone_number: string;
  picture: string;
};

const SignUp = (): JSX.Element => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const { register, handleSubmit, errors, reset } = useForm<CreateUserInput>();

  const onSubmit = (data: User) => {
    if (data != null || undefined) {
      console.log(data);
      const newUser = createUser({
        variables: {
          data,
        },
      });
      return newUser;
    }
    // createNewUser(data);
    // reset();        // RedirectToInterpretes();
  };

  const history = useHistory();
  // const RedirectToInterpretes = () => {
  //   history.push(`/interpretes`);
  // };

  return (
    <section className="signup">
      <Menu />
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="signup-title">Sign Up</h1>
        <div className="signup-fields">
          <label className="username">FirstName</label>
          <input
            type="text"
            name="firstname"
            ref={register({ maxLength: 30, required: true })}
            onFocus={FloatUserNameLabel}
            onBlur={UnFloatUsernameLabel}
            autoFocus
          />
          {errors.firstname && errors.firstname.type === 'required' && (
            <div className="error">You must enter your firstname</div>
          )}
        </div>
        <div className="signup-fields">
          <label className="username">Lastname</label>
          <input
            type="text"
            name="lastname"
            ref={register({ maxLength: 30, required: true })}
            onFocus={FloatUserNameLabel}
            onBlur={UnFloatUsernameLabel}
          />
          {errors.lastname && errors.lastname.type === 'required' && (
            <div className="error">You must enter your lastname</div>
          )}
        </div>
        <div className="signup-fields">
          <label className="username">Email</label>
          <input
            type="email"
            name="email"
            ref={register({ maxLength: 30, required: true })}
            onFocus={FloatUserNameLabel}
            onBlur={UnFloatUsernameLabel}
          />
          {errors.email && errors.email.type === 'required' && (
            <div className="error">You must enter your email</div>
          )}
        </div>
        <div className="signup-fields">
          <label className="password">Password</label>
          <input
            type="password"
            name="password"
            ref={register({ maxLength: 20, required: true })}
            onFocus={FloatPasswordLabel}
            onBlur={UnFloatPasswordLabel}
          />
          {errors.password && errors.password.type === 'required' && (
            <div className="error">You must enter your password.</div>
          )}
        </div>
        <div className="signup-fields">
          <label className="password">Address</label>
          <input
            type="text"
            name="address"
            ref={register({ maxLength: 20, required: false })}
            onFocus={FloatPasswordLabel}
            onBlur={UnFloatPasswordLabel}
          />
        </div>
        <div className="signup-fields">
          <label className="phone">Phone</label>
          <input
            type="number"
            name="phone"
            ref={register({ maxLength: 10, required: false })}
            onFocus={FloatPasswordLabel}
            onBlur={UnFloatPasswordLabel}
          />
        </div>
        <div className="signup-upload">
          <label className="upload" htmlFor="file">
            Upload a profile picture
          </label>
          <input
            type="file"
            name="photo"
            ref={register({ required: false })}
            className="fileInput"
          />
        </div>
        <button type="submit" className="signup-submit">
          Comfirm
        </button>
        <input type="submit" />
      </form>
    </section>
  );
};

export default SignUp;
