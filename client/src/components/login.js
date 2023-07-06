import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserContext from './userContext';

const Login = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { username: username, password: password };

    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authObject),
        credentials: 'include'
      });

      if (response.ok) {
        const { userId } = await response.json();
        console.log('User logged in.');
        console.log(userId);

        login(userId)
        navigate('/dashboard');
      } else {
        console.log('Failed to log in.');
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
      React.createElement('button', { type: 'submit' }, 'Login'),
      <Link to="/register">Create account</Link>
    )
  );
};

export default Login;
