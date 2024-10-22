import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaHandshake, FaBullhorn, FaRegNewspaper, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/Images/halal.jpeg';
import heroImage from '../../Assets/Images/invest.jpg';

const HomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div style={{ backgroundColor: 'white', color: 'black', fontFamily: "'Roboto', sans-serif" }}>
            {/* Header Section */}
            <Container fluid style={{ padding: '20px 0' }}>
                <Row className="align-items-center justify-content-between">
                    <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                        <img src={logo} alt="Company Logo" style={{ maxWidth: '150px', height: 'auto' }} />
                    </Col>
                    <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end">
                        <Button
                            variant="success"
                            style={{ borderColor: 'gold', color: 'white' }}
                            onClick={handleGetStarted}
                        >
                            Get Started
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* Hero Section */}
            <Container fluid style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
                <Row className="align-items-center">
                    {/* Image Column */}
                    <Col xs={12} md={6} className="d-flex justify-content-center mb-4 mb-md-0">
                        <img src={heroImage} alt="Hero" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} />
                    </Col>

                    {/* Text Content Column */}
                    <Col xs={12} md={6}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '600', color: '#333' }}>
                            Financing Tailored for Your Business
                        </h1>
                        <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.6' }}>
                            At Halal Finance Investment, we believe in supporting entrepreneurs and small businesses with Sharia-compliant loan solutions.
                            Pitch your business idea, and let us help you turn your vision into reality with tailored financing.
                        </p>
                        <Button
                            onClick={handleGetStarted}
                            variant="success"

                        >
                            Submit Your Pitch
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* Services Section */}
            <Container className="mt-5">
                <h2 className="mb-4 text-center" style={{ fontWeight: '600', fontSize: '2rem', color: '#333' }}>Our Core Services</h2>
                <Row>
                    <Col md={4}>
                        <div className="text-center p-4 border rounded shadow-sm" style={{ backgroundColor: '#f8f9fa', color: '#333' }}>
                            <FaHandshake size={50} style={{ color: 'gold' }} />
                            <h4 style={{ fontWeight: '500', marginTop: '15px' }}>Business Pitch Submissions</h4>
                            <p>Submit your business pitch to receive funding tailored to your needs, aligned with our halal principles.</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="text-center p-4 border rounded shadow-sm" style={{ backgroundColor: '#f8f9fa', color: '#333' }}>
                            <FaBullhorn size={50} style={{ color: 'gold' }} />
                            <h4 style={{ fontWeight: '500', marginTop: '15px' }}>Sharia-compliant Loans</h4>
                            <p>Get access to loan services designed for your projects, fully compliant with Islamic principles.</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="text-center p-4 border rounded shadow-sm" style={{ backgroundColor: '#f8f9fa', color: '#333' }}>
                            <FaRegNewspaper size={50} style={{ color: 'gold' }} />
                            <h4 style={{ fontWeight: '500', marginTop: '15px' }}>Investment Insights</h4>
                            <p>Stay updated with our expert insights and make informed decisions on investment opportunities.</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Footer Section */}
            {/* Footer Section */}
            {/* Footer Section */}
            {/* Footer Section */}
            <footer style={{
                backgroundColor: '#000',
                padding: '40px 0',
                color: 'white',
                textAlign: 'center',
                width: '100%',        // Ensures footer takes full width
                marginTop: '40px',    // Adds margin above the footer
                position: 'relative'  // Ensures it's correctly positioned
            }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} md={6} className="text-center mb-4">
                            <h5 style={{ color: 'gold' }}>Contact Us</h5>
                            <p style={{ fontSize: '1rem' }}>
                                <FaPhoneAlt style={{ color: 'gold', marginRight: '10px' }} />
                                +123 456 7890
                            </p>
                            <p style={{ fontSize: '1rem' }}>
                                <FaEnvelope style={{ color: 'gold', marginRight: '10px' }} />
                                info@halalfinance.com
                            </p>
                        </Col>
                    </Row>
                    <hr style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                    <Row className="justify-content-center">
                        <Col xs={12} md={4} className="mb-3 mb-md-0">
                            <h6 style={{ fontSize: '1.15rem', color: 'gold', fontWeight: '600' }}>Quick Links</h6>
                            <ul style={{ listStyleType: 'none', paddingLeft: '0', lineHeight: '2' }}>
                                <li><a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</a></li>
                                <li><a href="/services" style={{ color: 'white', textDecoration: 'none' }}>Services</a></li>
                                <li><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></li>
                                <li><a href="/faq" style={{ color: 'white', textDecoration: 'none' }}>FAQ</a></li>
                            </ul>
                        </Col>
                        <Col xs={12} md={4}>
                            <h6 style={{ fontSize: '1.15rem', color: 'gold', fontWeight: '600' }}>Connect with Us</h6>
                            <div>
                                <a href="https://facebook.com" style={{ color: 'white', marginRight: '15px' }}><i className="fab fa-facebook-f"></i> Facebook</a>
                                <a href="https://twitter.com" style={{ color: 'white', marginRight: '15px' }}><i className="fab fa-twitter"></i> Twitter</a>
                                <a href="https://linkedin.com" style={{ color: 'white' }}><i className="fab fa-linkedin-in"></i> LinkedIn</a>
                            </div>
                        </Col>
                    </Row>
                    <hr style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                    <Row className="justify-content-center">
                        <Col xs={12}>
                            <p style={{ marginBottom: '0', color: 'white' }}>&copy; {new Date().getFullYear()} Halal Finance Investment. All rights reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>



        </div>
    );
};

export default HomePage;
