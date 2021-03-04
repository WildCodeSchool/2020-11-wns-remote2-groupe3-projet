import React, { useState, useEffect, useContext } from 'react';
import Menu from '../../components/menu/Menu';
import './Signup.scss';
import { SignUpFadeIn } from '../../animations/forms';
import SignUpForm from './SignUpForm';

const SignUp = (): JSX.Element => {
  useEffect(() => {
    SignUpFadeIn();
  }, []);

  return (
    <section className="signup">
      <Menu />
      <SignUpForm />
    </section>
  );
};

export default SignUp;
