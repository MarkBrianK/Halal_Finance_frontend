import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaHandshake, FaBullhorn, FaRegNewspaper, FaShoppingCart } from 'react-icons/fa'; // Import FaShoppingCart icon
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/Images/halal_logo.jpeg';
import heroImage from '../../Assets/Images/invest.jpg';


const HomePage = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        // Navigate to dashboard if logged in, otherwise go to login
        if (isLoggedIn) {
            navigate('/dashboard');  // Adjust this to the correct dashboard route
        } else {
            navigate('/login');
        }
    };

    const handleSubmitPitch = () => {
        navigate('/add-pitch');
    };

    return (
        <div style={{
            background: 'linear-gradient(180deg, white 10%, black 50%, rgb(127, 110, 11) 100%)', // Linear gradient for the main background
            minHeight: '100vh', // Ensure it covers the full height
            color: 'black'
        }}>
            {/* Header Section */}
            <div style={{ padding: '20px 0' }}>
                <Row className="align-items-center justify-content-between mx-0">
                    <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                        <img src={logo} alt="Company Logo" style={{ maxWidth: '150px', height: 'auto' }} />
                    </Col>
                    <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end">
                        <Button className="btn" onClick={handleGetStarted}>
                            Get Started
                        </Button>
                    </Col>
                </Row>
            </div>

            {/* Hero Section */}
            <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
                <Row className="align-items-center mx-0">
                    {/* Image Column */}
                    <Col xs={12} md={6} className="d-flex justify-content-center mb-4 mb-md-0">
                        <img src={heroImage} alt="Hero" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} />
                    </Col>

                    {/* Text Content Column */}
                    <Col xs={12} md={6}>
                        <h1 className="text-black" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '600' }}>
                            Financing Tailored for Your Business
                        </h1>
                        <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.6' }}>
                            At Halal Finance Investment, we believe in supporting entrepreneurs and small businesses with Sharia-compliant loan solutions.
                            Pitch your business idea, and let us help you turn your vision into reality with tailored financing.
                        </p>
                        <Button className="btn" onClick={handleSubmitPitch}>
                            Submit Your Pitch
                        </Button>
                    </Col>
                </Row>
            </div>

            {/* Services Section */}
            <div className="mt-5 px-0">
                <h2 className="text-center text-white" style={{ fontWeight: '600', fontSize: '2rem' }}>Our Core Services</h2>
                <Row className="mx-0">
                    <Col md={3}>
                        <div className="text-center p-4 border rounded shadow-sm bg-white text-black">
                            <FaHandshake size={50} className="text-gold" />
                            <h4 style={{ fontWeight: '500', marginTop: '15px' }}>Business Pitch Submissions</h4>
                            <p>Submit your business pitch to receive funding tailored to your needs, aligned with our halal principles.</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="text-center p-4 border rounded shadow-sm bg-white text-black">
                            <FaBullhorn size={50} className="text-gold" />
                            <h4 style={{ fontWeight: '500', marginTop: '15px' }}>Sharia-compliant Loans</h4>
                            <p>Get access to loan services designed for your projects, fully compliant with Islamic principles.</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="text-center p-4 border rounded shadow-sm bg-white text-black">
                            <FaRegNewspaper size={50} className="text-gold" />
                            <h4 style={{ fontWeight: '500', marginTop: '15px' }}>Investment Insights</h4>
                            <p>Stay updated with our expert insights and make informed decisions on investment opportunities.</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="text-center p-4 border rounded shadow-sm bg-white text-black">
                            <FaShoppingCart size={50} className="text-gold" /> {/* Added Corporate Shopping icon */}
                            <h4 style={{ fontWeight: '500', marginTop: '15px' }}>Corporate Shopping</h4>
                            <p>Access our corporate shopping services for exclusive business deals and bulk purchasing options.</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default HomePage;
