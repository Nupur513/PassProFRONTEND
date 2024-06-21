import React from 'react';
import './Landingpage.css'; // Import custom CSS for landing page styling
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer/Footer'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Container className="landing-page-content">
        <h1>Welcome to PassPro</h1>
        <p className="lead">Manage your outpasses with ease.</p>

        <div className="button-container">
          <Button variant="primary" size="lg" href="/login">Login</Button>
          <Button variant="outline-primary" size="lg" href="/register">Register</Button>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;




