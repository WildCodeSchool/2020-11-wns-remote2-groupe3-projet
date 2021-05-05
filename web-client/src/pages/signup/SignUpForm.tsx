import React, { useState, useContext } from 'react';
import {
  FloatUserNameLabel,
  UnFloatUsernameLabel,
  FloatPasswordLabel,
  UnFloatPasswordLabel,
  FloatLastNameLabel,
  UnFloatLastNameLabel,
  FloatEmailLabel,
  UnFloatEmailLabel,
  FloatAddressLabel,
  UnFloatAddressLabel,
  FloatPhoneLabel,
  UnFloatPhoneLabel,
} from '../../animations/forms';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CreateUserInput, User } from '../../types/types';
import { CREATE_USER } from '../../mutations/mutations';
import { LoginContext } from '../../Context/LoginContext';
import Loader from '../../components/loader/Loader';

const SignUpForm = (): JSX.Element => {
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm<CreateUserInput>();
  const { setIsLoggedIn } = useContext(LoginContext);
  const [createUser] = useMutation(CREATE_USER);
  const handleInvalidFields = () => {
    setHasErrors(true);
    reset();
  };
  const onSubmit = async (data: User) => {
    setIsLoading(true);
    if (data) {
      try {
        const newUser = await createUser({
          variables: {
            data,
          },
        });
        if (newUser) {
          setIsLoggedIn(true);
          return newUser;
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
      <form
        className="signup-form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="new-password"
      >
        <h1 className="signup-title title">Sign Up</h1>
        <div className="signup-fields firstname-block">
          <label className="username">FirstName</label>
          <input
            type="text"
            name="firstname"
            ref={register({ maxLength: 30, required: true })}
            onFocus={FloatUserNameLabel}
            onBlur={UnFloatUsernameLabel}
            autoFocus
            autoComplete="off"
          />
          {errors.firstname && errors.firstname.type === 'required' && (
            <div className="error">You must enter your firstname</div>
          )}
        </div>
        <div className="signup-fields lastname-block">
          <label className="lastname">Lastname</label>
          <input
            type="text"
            name="lastname"
            ref={register({ maxLength: 30, required: true })}
            onFocus={FloatLastNameLabel}
            onBlur={UnFloatLastNameLabel}
            autoComplete="off"
          />
          {errors.lastname && errors.lastname.type === 'required' && (
            <div className="error">You must enter your lastname</div>
          )}
        </div>
        <div className="signup-fields email-block">
          <label className="email">Email</label>
          <input
            type="email"
            name="email"
            ref={register({ maxLength: 30, required: true })}
            onFocus={FloatEmailLabel}
            onBlur={UnFloatEmailLabel}
            autoComplete="off"
          />
          {errors.email && errors.email.type === 'required' && (
            <div className="error">You must enter your email</div>
          )}
        </div>
        <div className="signup-fields password-block">
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
        <div className="signup-fields address-block">
          <label className="address">Address</label>
          <input
            type="text"
            name="adress"
            ref={register({ maxLength: 80, required: false })}
            onFocus={FloatAddressLabel}
            onBlur={UnFloatAddressLabel}
            autoComplete="off"
          />
        </div>
        <div className="signup-fields phone-block">
          <label className="phone">Phone</label>
          <input
            type="tel"
            name="phone_number"
            ref={register({ required: false })}
            onFocus={FloatPhoneLabel}
            onBlur={UnFloatPhoneLabel}
            autoComplete="off"
          />
        </div>
        <div className="signup-upload upload-block">
          {/* <label className="upload" htmlFor="file">
            Upload a profile picture
          </label> */}
          <input
            type="text"
            name="picture"
            ref={register({ required: false })}
            className="fileInput"
            autoComplete="off"
          />
        </div>
        {hasErrors && (
          <div className={`error has-error `}>
            An error occured. Please retry.
          </div>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <button type="submit" className="signup-submit submit">
            Comfirm
          </button>
        )}
      </form>
    </>
  );
};

export default SignUpForm;
