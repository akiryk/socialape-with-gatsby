import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Scream = () => {
  const [scream, setScream] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/simplereactapp-bed9b/us-east1/api/scream/9770ZONzTyau9e7zrKQx`
      )
      .then(response => {
        console.log('SCREAM', response.data);
        setScream(response.data);
      })
      .catch(error => {
        console.log(error, error.message);
      });
  }, []);

  return (
    <>
      <h2>Messages</h2>
      {scream ? (
        <>
          <p>{scream.body}</p>
          <small>by {scream.userHandle}</small>
        </>
      ) : (
        <p>...Loading still...</p>
      )}
    </>
  );
};

export default Scream;
