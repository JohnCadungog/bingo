import React, { useState } from 'react';
import axios from 'axios';

function RegisterUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://hyeumine.com/newuser.php', {
        firstname: firstName,
        lastname: lastName,
      });

      console.log(response.data); // Log the response from the server (contains details of the created user)

      // Handle successful user registration
      alert('User registered successfully!');
      setFirstName('');
      setLastName(''); 
    } catch (error) {
      console.error(error);
      alert('Error registering user:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <br />
      <label htmlFor="lastName">Last Name:</label>
      <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <br />
      <button type="submit">Register User</button>
    </form>
  );
}

export default RegisterUser;
