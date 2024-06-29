// LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; // Import the configured Axios instance
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css'; 

const LoginPage = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/login', form);
      const { token, role } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      handleRedirect(role); // Redirect user based on role
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleRedirect = (role) => {
    if (role === 'student') {
      navigate('/student/dashboard'); // Redirect student to student dashboard
    } else if (role === 'warden') {
      navigate('/warden/dashboard'); // Redirect warden to warden dashboard
    } else {
      setError('Role not recognized');
    }
  };

  return (
    <div className="login-page"> {/* Apply the same class for styling consistency */}
      <Container className="login-page-content"> {/* Apply the same class for styling consistency */}
        <h1>Login to PassPro</h1>
        <Form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginPage;
