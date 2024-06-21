import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '1rem 0',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%'
  };

  const textMutedStyle = {
    color: '#ccc',
    fontSize: '0.9rem'
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        <span style={textMutedStyle}>© 2024 PassPro</span>
       
       
      </div>
    </footer>
  );
}

export default Footer;
