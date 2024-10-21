import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../Styles/LoginSignup.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      'http://localhost:3000/users/sign_in',
      { user: formData },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then(response => {

        localStorage.setItem('token', response.data.token);
        navigate("/");
      })
      .catch(error => {
        alert('Error: ' + (error.response?.data.message || 'Something went wrong'));
      });
  };

  return (
    <div className="signin">
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Row>
          <Col xs={12} md={8} lg={12}>
            <div className="form">
              <Form onSubmit={handleSubmit} className="p-4 rounded">
                <h2 className="text-center" style={{ color: '#c7a034' }}>Login</h2>

                <Form.Group controlId="formEmail">
                  <Form.Label className="formlabel">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mb-3"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label className="formlabel">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="mb-3"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="customButton w-100 mb-3">
                  Login
                </Button>

                <p className="text-center">
                  Don't have an account? <Link to="/signup" className="tosignup">Sign Up</Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
