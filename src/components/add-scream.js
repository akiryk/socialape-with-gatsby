import React, { useRef } from 'react';
import { navigate } from 'gatsby';
import axios from 'axios';

const AddScream = () => {
  const screamInputRef = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const body = screamInputRef.current.value;
    console.log('body', body);
    if (body === '') {
      return;
    }
    await axios.post(`${process.env.API}/scream`, {
      body,
    });
    navigate('/app/screams');
  };
  return (
    <>
      <h2>Add Scream</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="scream">Type your tweet here:</label>
        <input type="text" ref={screamInputRef}></input>
        <button>Submit</button>
      </form>
    </>
  );
};

export default AddScream;
