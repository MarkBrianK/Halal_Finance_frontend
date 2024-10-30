import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../Components/utilis/axiosConfig';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    role: 'corporate'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    axios.post('/users', { user: formData })
      .then(response => {
        alert('Confirmation email sent! Check your inbox.');
        navigate("/confirm");
      })
      .catch(error => {
        setError(error.response?.data.error || 'Something went wrong');
      });
  };

  return (
    <div className="signin">
      <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'linear-gradient(90deg, black 0%, rgb(127, 110, 11) 100%)' }}>
        <Row className="w-100">
          <Col xs={12} md={6} lg={5} className="mx-auto">
            <div className="form p-4 shadow-sm rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
              <h2 className="text-center" style={{ color: 'grey', fontFamily: "'Roboto', sans-serif", fontWeight: '600' }}>Sign Up</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group controlId="formEmail">
                  <Form.Label className="formlabel" style={{ color: 'white', border: "none" }}>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`mb-3 ${error ? 'is-invalid' : ''}`}
                    style={{ borderRadius: '4px', borderColor: error ? '#e3342f' : '#ccc' }}
                  />
                </Form.Group>

                <Form.Group controlId="formRole">
                  <Form.Label className="formlabel" style={{ color: 'white', border: "none" }}>Select Role</Form.Label>
                  <Form.Select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className={`mb-3 ${error ? 'is-invalid' : ''}`}
                    style={{ borderRadius: '4px', borderColor: error ? '#e3342f' : '#ccc' }}
                  >
                    <option value="wholesaler"> WholeSaler</option>
                    <option value="corporate">Corporate</option>
                    <option value="individual">Individual</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label className="formlabel" style={{ color: 'white', border: "none" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`mb-3 ${error ? 'is-invalid' : ''}`}
                    style={{ borderRadius: '4px', borderColor: error ? '#e3342f' : '#ccc' }}
                  />
                </Form.Group>

                <Form.Group controlId="formPasswordConfirm">
                  <Form.Label className="formlabel" style={{ color: 'white', border: "none" }}>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.password_confirmation}
                    onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
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
