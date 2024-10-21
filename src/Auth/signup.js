import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Styles/LoginSignup.css";

function SignUp() {
  const [formData, setFormData] = useState({ email: '', password: '', password_confirmation: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/users', { user: formData })
      .then(response => {
        alert('Confirmation email sent! Check your inbox.');
        navigate("/login");
      })
      .catch(error => {
        alert('Error: ' + error.response.data.error);
      });
  };

  return (
    <div className="signin">
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Row>
          <Col xs={12} md={8} lg={12}>
            <div className="form">
              <Form onSubmit={handleSubmit} className="p-4 rounded" >
                <h2 className="text-center" style={{ color: '#c7a034' }}>Sign Up</h2>

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

                <Form.Group controlId="formPasswordConfirm">
                  <Form.Label className="formlabel">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.password_confirmation}
                    onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                    className="mb-3"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="customButton w-100 mb-3">
                  Sign Up
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;
