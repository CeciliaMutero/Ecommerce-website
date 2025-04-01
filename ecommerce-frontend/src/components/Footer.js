import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <p>
          &copy; {new Date().getFullYear()} My E-Commerce. All Rights Reserved.
        </p>
        <div className='footer-social'>
          <a href='https://facebook.com' target='_blank' rel='noreferrer'>
            Facebook
          </a>
          <a href='https://twitter.com' target='_blank' rel='noreferrer'>
            Twitter
          </a>
          <a href='https://instagram.com' target='_blank' rel='noreferrer'>
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
