import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaMoneyBillWave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/Images/halal.jpeg';

const HomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <Container
            fluid
            className="text-center d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: '100vh', color: 'white', position: 'relative' }}
        >
            <img
                src={logo}
                alt="Company Logo"
                className="position-absolute top-0 end-0 m-3"
                style={{ width: '100px', height: 'auto' }}
            />
            <Row className="justify-content-center align-items-center" style={{ height: '100%' }}>
                <Col md={8} className="text-center">
                    <h1 className="display-4">Welcome to Our Finance App</h1>
                    <FaMoneyBillWave size={100} style={{ color: 'gold' }} />
                    <p className="mt-3 fs-5">Your gateway to financing opportunities.</p>
                    <Button variant="outline-light" style={{ borderColor: 'gold' }} onClick={handleGetStarted}>
                        Get Started
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
