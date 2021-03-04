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
  const onSubmit = (data: User) => {
    if (data != null || undefined) {
      try {
        console.log(data);
        const newUser = createUser({
          variables: {
            data,
          },
        });
        reset();
        //RedirectToInterpretes();
        return newUser;
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finnaly');
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
            ref={register({ maxLength: 20, required: false })}
            onFocus={FloatAddressLabel}
            onBlur={UnFloatAddressLabel}
            autoComplete="off"
          />
        </div>
        <div className="signup-fields phone-block">
          <label className="phone">Phone</label>
          <input
            type="number"
            name="phone_number"
            ref={register({ maxLength: 10, required: false })}
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
        <button type="submit" className="signup-submit submit">
          Comfirm
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
