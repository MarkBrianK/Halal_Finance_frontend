import React from "react";
import { Row, Col, Container} from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{ background: 'linear-gradient(90deg, gold 0%, black 100%)', color: 'white', padding: '20px 0', marginTop:"20px" }}>
            <Container>
                <Row className="justify-content-center mx-0 text-center">
                    <Col xs={12} md={6} className="mb-4">
                        <h5>Contact Us</h5>
                        <p style={{ fontSize: '1rem' }}>
                            <FaPhoneAlt className="text-gold" style={{ marginRight: '10px' }} />
                            +123 456 7890
                        </p>
                        <p style={{ fontSize: '1rem' }}>
                            <FaEnvelope className="text-gold" style={{ marginRight: '10px' }} />
                            info@halalfinance.com
                        </p>
                    </Col>
                </Row>
                <hr style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                <Row className="justify-content-center mx-0 text-center">
                    <Col xs={12} md={4} className="mb-4">
                        <h6 className="text-gold">Quick Links</h6>
                        <ul style={{ listStyleType: 'none', paddingLeft: '0', lineHeight: '2' }}>
                            <li><a href="/about" className="text-white">About Us</a></li>
                            <li><a href="/services" className="text-white">Services</a></li>
                            <li><a href="/contact" className="text-white">Contact</a></li>
                            <li><a href="/faq" className="text-white">FAQ</a></li>
                        </ul>
                    </Col>
                    <Col xs={12} md={4} className="mb-4">
                        <h6 className="text-gold">Connect with Us</h6>
                        <div>
                            <a href="https://facebook.com" className="text-white me-3">Facebook</a>
                            <a href="https://twitter.com" className="text-white me-3">Twitter</a>
                            <a href="https://linkedin.com" className="text-white">LinkedIn</a>
                        </div>
                    </Col>
                </Row>
                <hr style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                <Row className="justify-content-center mx-0 text-center">
                    <Col xs={12}>
                        <p>&copy; {new Date().getFullYear()} Halal Finance Investment. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
