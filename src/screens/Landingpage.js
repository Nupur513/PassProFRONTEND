import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Landingpage.css'; // Import custom CSS for landing page styling
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Container className="landing-page-content">
        <h1>Welcome to PassPro</h1>
        <p className="lead">Manage your outpasses with ease.</p>

        <div className="button-container">
          <Link to="/login">
            <Button variant="primary" size="lg">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline-primary" size="lg">Register</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;


