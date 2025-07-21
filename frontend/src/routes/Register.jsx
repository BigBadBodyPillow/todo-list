import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { api } from '../api';

//css
import '../Styles/Register.css';

export default function Register() {
  const [errorMessage, setErrorMessage] = useState('');
  const naviate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await api.post('/auth/register', values);
      resetForm();
      setErrorMessage('');
      //go to login
      naviate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!values.email.endsWith('@gmail.com')) {
      errors.email = 'Email must end with @gmail.com';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  return (
    <main className="form-container">
      <h2>Register</h2>

      <Formik
        initialValues={{ email: '', password: '' }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        <Form className="register-form">
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" placeholder="Gmail" />
          <ErrorMessage name="email" component="div" className="error" />

          <label htmlFor="password">Password</label>
          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" className="error" />

          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Register</button>
        </Form>
      </Formik>
      <p className="login-link">
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </main>
  );
}
