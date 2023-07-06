import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { username, password };

    try {
      const response = await fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        console.log('User registered successfully!');
        navigate('/login');
      } else {
        console.log('Failed to register user.');
      }
    } catch(err) {
      console.log(err)
    }
  };

  return (
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('div', null,
        React.createElement('label', { htmlFor: 'username' }, 'Username:'),
        React.createElement('input', {
          type: 'text',
          id: 'username',
          value: username,
          onChange: (e) => setUsername(e.target.value)
        })
      ),
      React.createElement('div', null,
        React.createElement('label', { htmlFor: 'password' }, 'Password:'),
        React.createElement('input', {
          type: 'password',
          id: 'password',
          value: password,
          onChange: (e) => setPassword(e.target.value)
        })
      ),
      React.createElement('button', { type: 'submit' }, 'Register')
    )
  );
};

export default Register;
