import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/users/sign_in', { user: formData })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        onLogin(); // Call the login handler
        navigate("/");
      })
      .catch(error => {
        setError(error.response?.data.message || 'Something went wrong');
      });
  };

  return (
    <div className="signin">
      <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
        <Row className="w-100">
          <Col xs={12} md={6} lg={5} className="mx-auto">
            <div className="form p-4 shadow-sm rounded" style={{ backgroundColor: '#fff' }}>
              <h2 className="text-center" style={{ color: '#c7a034', fontFamily: "'Roboto', sans-serif", fontWeight: '600' }}>Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group controlId="formEmail">
                  <Form.Label className="formlabel" style={{ color: 'white' }}>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`mb-3 ${error ? 'is-invalid' : ''}`} // Visual feedback on error
                    style={{ borderRadius: '4px', borderColor: error ? '#e3342f' : '#ccc' }}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label className="formlabel" style={{ color: 'white' }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`mb-3 ${error ? 'is-invalid' : ''}`}
                    style={{ borderRadius: '4px', borderColor: error ? '#e3342f' : '#ccc' }}
                  />
                </Form.Group>
                <Button
                  variant="success"
                  type="submit"
                  className="customButton w-100 mb-3"
                  style={{ backgroundColor: '#c7a034', borderColor: '#c7a034', borderRadius: '4px', fontWeight: '500' }}
                >
                  Login
                </Button>
                <p className="text-center">
                  Don't have an account? <Link to="/signup" className="tosignup" style={{ color: '#c7a034' }}>Sign Up</Link>
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
