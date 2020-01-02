import React, { useContext, useState } from 'react';
import axios from 'axios';
import { navigate } from 'gatsby';
import Context from 'components/common/Context';
import setAuthToken from 'helpers/setAuthToken';

const Form = ({ form }) => {
  const { dispatchUserAction } = useContext(Context);
  const [isSubmitting, setSubmitting] = useState(false);
  const [details, setDetails] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = e => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleBlur = e => {
    if (!e.target.value) {
      setErrors({ ...errors, [e.target.name]: 'Required field' });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { username, email, password } = details;

      if (form === 'login') {
        if (!email || !password) {
          setErrors({
            ...errors,
            email: 'Field is required',
            password: 'Field is required',
          });
        } else {
          const { data } = await axios.post(`${process.env.API}/login`, {
            email,
            password,
          });

          const token = `Bearer ${data.token}`;

          await setAuthToken(token);
          dispatchUserAction({ type: 'SAVE_USER', payload: data });
          window.localStorage.setItem('token', token);
          navigate('/app/tasks/');
        }
      } else {
        /*
         email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
        */
        if (!username || !email || !password) {
          alert('aye sir');
        } else {
          const { data } = await axios.post(`${process.env.API}/signup`, {
            username,
            email,
            password,
          });

          const token = `Bearer ${data.token}`;

          await setAuthToken(token);
          dispatchUserAction({ type: 'SAVE_USER', payload: data });
          window.localStorage.setItem('token', token);
          navigate('/app/screams/');
        }
      }
    } catch (err) {
      if (err.response.data.email) {
        setErrors({ ...errors, email: err.response.data.email });
      } else if (err.response.data.email) {
        setErrors({ ...errors, email: err.response.data.password });
      } else if (err.response.data.email && err.response.data.email) {
        setErrors({
          ...errors,
          email: err.response.data.email,
          password: err.response.data.password,
        });
      } else {
        setErrors({
          ...errors,
          email: err.response.data.error,
        });
      }
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {form === 'register' && (
        <>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Enter your username"
            name="username"
          />
          {errors.username && (
            <span style={{ color: 'red' }}>{errors.username}</span>
          )}
        </>
      )}
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        placeholder="Enter your email"
        name="email"
      />
      {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        placeholder="Enter your password"
        name="password"
      />
      {errors.password && (
        <span style={{ color: 'red' }}>{errors.password}</span>
      )}
      <button type="submit" disabled={isSubmitting}>
        {form}
      </button>
    </form>
  );
};

export default Form;
