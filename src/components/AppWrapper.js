import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { navigate } from 'gatsby';
import setAuthToken from 'helpers/setAuthToken';
import Layout from 'components/common/Layout';
import Context from './common/Context';

const AppWrapper = ({ children }) => {
  const { user, dispatchUserAction } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = window.localStorage.getItem('token');
      console.log('token', token);
      if (token && token !== 'undefined') {
        axios.defaults.headers.common['Authorization'] = token;
        const { data } = await axios({
          method: 'GET',
          url: `${process.env.API}/user`,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        dispatchUserAction({ type: 'SAVE_USER', payload: data.user });
        if (
          window.location.pathname === '/app/login' ||
          window.location.pathname === '/app/register' ||
          window.location.pathname === '/app' ||
          window.location.pathname === '/app/login/' ||
          window.location.pathname === '/app/register/'
        ) {
          navigate('/app/screams/');
        }
        setLoading(false);
      } else {
        console.log(
          'here?',
          window.location.pathname,
          window.location.pathname === '/app/add-scream'
        );
        if (
          window.location.pathname === '/app/tasks' ||
          window.location.pathname === '/app/tasks/' ||
          window.location.pathname === '/app/task' ||
          window.location.pathname === '/app/task/' ||
          window.location.pathname === '/app/task/new/' ||
          window.location.pathname === '/app/task/new' ||
          window.location.pathname === '/app/add-scream' ||
          window.location.pathname === '/app/add-scream/'
        ) {
          navigate('/app/login/');
        }
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      dispatchUserAction({ type: 'LOGOUT' });
      window.localStorage.removeItem('token');
      setAuthToken(false);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user.isLoggedIn) {
      fetchUser();
    }
  }, []);

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <Layout isLoggedIn={user.isLoggedIn} logout={logout}>
          {children}
        </Layout>
      )}
    </>
  );
};

export default AppWrapper;
