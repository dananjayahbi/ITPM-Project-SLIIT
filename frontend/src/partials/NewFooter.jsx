import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; // For solid icons
import { faFacebookF, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'; // For brand icons


const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#8BC34A', padding: '50px 0', textAlign: 'right' ,marginTop:'60px'}}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <div style={{ flex: '0 0 calc(33.33% - 20px)', maxWidth: 'calc(33.33% - 20px)', marginRight: '20px' }}>
            <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '15px' }}>About Us</h3>
            <p style={{ color: '#fff', lineHeight: '1.6' }}>We are dedicated to transforming waste management through innovative solutions and sustainable practices.</p>
          </div>
          <div style={{ flex: '0 0 calc(33.33% - 20px)', maxWidth: 'calc(33.33% - 20px)', marginRight: '20px', textAlign: 'left' }}>
            <div style={{ marginLeft: '140px' }}>
              <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '15px' }}>Contact Us</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#fff', marginBottom: '10px' }}>
                <li style={{ marginBottom: '5px' }}><FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginBottom: '5px', marginRight: '5px' }} /> 123 Main Street, City, Country</li>
                <li style={{ marginBottom: '5px' }}><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '5px' }} /> info@example.com</li>
                <li style={{ marginBottom: '5px' }}><FontAwesomeIcon icon={faPhone} style={{ marginRight: '5px' }} /> +1 (123) 456-7890</li>
              </ul>
            </div>
          </div>
          <div style={{ flex: '0 0 calc(33.33% - 20px)', maxWidth: 'calc(33.33% - 20px)' }}>
            <div style={{marginLeft:'-10px'}}>
            <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '15px',marginLeft:'-80px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#fff' }}>
              <div style={{ textAlign: 'left', marginLeft: '280px' }}>
                <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
                <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Services</a></li>
                <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Projects</a></li>
                <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Blog</a></li>
                <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a></li>
              </div>
            </ul>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p style={{ color: '#fff', fontSize: '16px' }}>&copy; 2024 Your Company. All Rights Reserved.</p>
          <div>
            <a href="#" style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }}><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }}><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }}><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
