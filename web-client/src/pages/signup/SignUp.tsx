import React, { useEffect } from 'react';
import Menu from '../../components/menu/Menu';
import './Signup.scss';
import SignUpForm from './SignUpForm';
import { SignUpFadeIn } from '../../animations/forms';

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
