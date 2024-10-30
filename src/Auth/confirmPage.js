import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../Components/utilis/axiosConfig';

const EmailConfirmation = () => {
    const [token, setToken] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const navigate = useNavigate()

    const handleConfirmation = async () => {
        try {
            await axios.post('/users/confirmations', { confirmation_token: token });
            setConfirmationMessage('Email confirmed successfully!');
            navigate("/login");
        } catch (error) {
            setConfirmationMessage('Invalid token or error confirming email.');
        }
    };

    return (
        <div className="confirmation-page">
            <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'linear-gradient(90deg, black 0%, rgb(127, 110, 11) 100%)' }}>
                <Row className="w-100">
                    <Col xs={12} md={6} lg={5} className="mx-auto">
                        <div className="form p-4 shadow-sm rounded" style={{ backgroundColor: '#fff' }}>
                            <h2 className="text-center" style={{ color: 'grey', fontFamily: "'Roboto', sans-serif", fontWeight: '600' }}>Confirm Your Email</h2>
                            <Form className="mt-3">
                                <Form.Group controlId="formToken">
                                    <Form.Label style={{ color: 'white', border: "none" }}>Confirmation Token</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter confirmation token"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                        className="mb-3"
                                        style={{ borderRadius: '4px', borderColor: '#ccc' }}
                                    />
                                </Form.Group>
                                <Button
                                    variant="success"
                                    onClick={handleConfirmation}
                                    className="customButton w-100 mb-3"
                                    style={{ backgroundColor: '#c7a034', borderColor: '#c7a034', borderRadius: '4px', fontWeight: '500' }}
                                >
                                    Confirm
                                </Button>
                                {confirmationMessage && <div className="alert alert-info text-center">{confirmationMessage}</div>}
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EmailConfirmation;
