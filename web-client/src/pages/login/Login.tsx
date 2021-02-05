import React, { useRef } from 'react';
import './login.scss';
import Menu from '../../components/menu/Menu';
import { FcGoogle } from 'react-icons/fc';
import { RiFacebookFill } from 'react-icons/ri';
import {
  FloatUserNameLabel,
  UnFloatPasswordLabel,
  UnFloatUsernameLabel,
  FloatPasswordLabel,
} from '../../animations/animations';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import IUserLogin from '../../schemaTypes';

const Login = (): JSX.Element => {
  const { register, handleSubmit, errors, reset } = useForm<IUserLogin>();
  const onSubmit = (data: IUserLogin): void => {
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
      <Menu />
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
