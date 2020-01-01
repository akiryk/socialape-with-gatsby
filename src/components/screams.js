import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const UL = styled.ul`
  list-style: none;
  color: #777;
`;

const Screams = () => {
  const [screams, setScreams] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/simplereactapp-bed9b/us-east1/api/screams`)
      .then(response => {
        console.log(response.data);
        setScreams(response.data);
      })
      .catch(error => {
        console.log(error, error.message);
      });
  }, []);

  return (
    <>
      <h2>Messages</h2>
      {screams.length ? (
        <UL>
          {screams.map(({ screamId, body, userHandle, userImage }) => (
            <li key={screamId}>
              <p>{body}</p>
              <small>by {userHandle}</small>
            </li>
          ))}
        </UL>
      ) : (
        <p>...Loading still...</p>
      )}
    </>
  );
};

export default Screams;
