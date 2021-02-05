import React, { useState } from 'react';
import './login.scss';
import Logo from '../../assets/images/logo.png';
import { FcGoogle } from 'react-icons/fc';
import { RiFacebookFill } from 'react-icons/ri';
import {
  FloatUserNameLabel,
  UnFloatPasswordLabel,
  UnFloatUsernameLabel,
  FloatPasswordLabel,
} from './animations';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface IUserInput {
  username: string;
  password: string;
}

const Login = (): JSX.Element => {
  const { register, handleSubmit, errors, reset } = useForm<IUserInput>();
  const onSubmit = (data: IUserInput): void => {
    console.log('data', data);
    reset();
    RedirectToInterpretes();
  };
  const history = useHistory();
  const RedirectToInterpretes = () => {
    history.push(`/interpretes`);
  };

  return (
    <section className="login">
      <ul className="login-menu">
        <li className="login-logo">
          <img src={Logo} alt="logo" />
        </li>
        <li className="login-signup">
          <div className="login-signup-block">
            <span className="login-signup-text"> Dont have an account ?</span>
            <button className="login-signup-button">Sign Up</button>
          </div>
        </li>
      </ul>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login-title">Sign In</h1>
        <div className="login-fields">
          <label className="username">Username</label>
          <input
            type="text"
            name="username"
            ref={register({ maxLength: 30, required: true })}
            onFocus={FloatUserNameLabel}
            onBlur={UnFloatUsernameLabel}
          />
          {errors.username && errors.username.type === 'required' && (
            <div className="error">You must enter your name.</div>
          )}
        </div>
        <div className="login-fields">
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
        <button type="submit" className="login-signin">
          Sign In
        </button>
        <p className="login-separator">Or</p>
        <button className="login-facebook">
          <RiFacebookFill />
          Sign in with Facebook
        </button>
        <button className="login-google">
          <FcGoogle />
          Sign in with Google
        </button>
      </form>
    </section>
  );
};

export default Login;
