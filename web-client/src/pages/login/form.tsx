import React, { useContext, useState } from 'react';
import {
  FloatUserNameLabel,
  UnFloatPasswordLabel,
  UnFloatUsernameLabel,
  FloatPasswordLabel,
} from '../../animations/forms';
import { useForm } from 'react-hook-form';
import { CreateSessionInput } from '../../types/types';
import { useMutation } from '@apollo/client';
import { AUTH_USER } from '../../mutations/mutations';
import { FcGoogle } from 'react-icons/fc';
import { RiFacebookFill } from 'react-icons/ri';
import { LoginContext } from '../../Context/LoginContext';
import Loader from '../../components/loader/Loader';

export const Form = (): JSX.Element => {
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm<
    CreateSessionInput
  >();
  const [createSession] = useMutation(AUTH_USER);
  const { setIsLoggedIn } = useContext(LoginContext);

  const handleInvalidFields = () => {
    setHasErrors(true);
    reset();
  };
  const onSubmit = async (data: CreateSessionInput) => {
    setIsLoading(true);
    const { email, password } = data;
    if (data != null || undefined) {
      try {
        const response = await createSession({
          variables: {
            credentials: {
              email,
              password,
            },
          },
        });
        if (response) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        handleInvalidFields();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login-title title">Sign In</h1>
        <div className="login-fields username-block">
          <label className="username">Username</label>
          <input
            type="email"
            name="email"
            ref={register({ maxLength: 30, required: true })}
            onFocus={FloatUserNameLabel}
            onBlur={UnFloatUsernameLabel}
            autoComplete="off"
          />
          {errors.email && errors.email.type === 'required' && (
            <div className="error">You must enter your email.</div>
          )}
        </div>
        <div className="login-fields password-block">
          <label className="password">Password</label>
          <input
            type="password"
            name="password"
            ref={register({ maxLength: 20, required: true })}
            onFocus={FloatPasswordLabel}
            onBlur={UnFloatPasswordLabel}
            autoComplete="off"
          />
          {errors.password && errors.password.type === 'required' && (
            <div className="error">You must enter your password.</div>
          )}
        </div>
        {hasErrors && (
          <div className={`error has-error `}>
            Invalid fields. Please retry.
          </div>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <button
              type="submit"
              className="login-signin submit"
              disabled={isLoading}
            >
              Sign In
            </button>
            <p className="login-separator separator">Or</p>
            <button className="login-facebook facebook">
              <RiFacebookFill />
              Sign in with Facebook
            </button>
            <button className="login-google google">
              <FcGoogle />
              Sign in with Google
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default Form;
