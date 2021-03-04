import React, { useEffect } from 'react';
import './login.scss';
import Menu from '../../components/menu/Menu';
import Form from '../login/form';
import { FadeInForm } from '../../animations/forms';

const Login = (): JSX.Element => {
  useEffect(() => {
    FadeInForm();
  }, []);

  return (
    <section className="login">
      <Menu />
      <Form />
    </section>
  );
};

export default Login;
