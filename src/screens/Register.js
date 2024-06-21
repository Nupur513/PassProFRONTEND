import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RegisterPage = () => {
  const [form, setForm] = useState({
    userId: '',
    username: '',
    password: '',
    role: '',
    fullName: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and registration logic here
    // Example: navigate to login page after successful registration
    navigate('/login');
  };

  return (
    <div className="register-page">
      <Container className="register-page-content">
        <h1>Register for PassPro</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUserId">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your user ID"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              required
            />
          </Form.Group>

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

          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              <option value="student">Student</option>
              <option value="warden">Warden</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterPage;
