import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import axios from 'axios';

const UpdatePitch = ({ pitch, setSelectedPitch }) => {
  const [title, setTitle] = useState(pitch.title || '');
  const [description, setDescription] = useState(pitch.description || '');
  const [amountRequested, setAmountRequested] = useState(pitch.amount_requested || 0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (pitch) {
      setTitle(pitch.title);
      setDescription(pitch.description);
      setAmountRequested(pitch.amount_requested);
    }
  }, [pitch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:3000/pitches/${pitch.id}`, {
        title,
        description,
        amount_requested: amountRequested,
      });

      setSuccess("Pitch successfully updated!");
      setError('');

      setSelectedPitch(null);
    } catch (err) {
      setError('Error updating pitch. Please try again.');
      setSuccess('');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setSelectedPitch(null);
  };

  return (
    <Container className="p-4">
      <Card style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: "#c7a034", fontWeight: "bold" }}>
            Update Pitch
          </h2>

          {success && <p className="text-success text-center">{success}</p>}
          {error && <p className="text-danger text-center">{error}</p>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Pitch Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter pitch title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ borderRadius: "8px", padding: "10px" }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formAmountRequested">
                  <Form.Label>Amount Requested (KSH)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    value={amountRequested}
                    onChange={(e) => setAmountRequested(e.target.value)}
                    required
                    style={{ borderRadius: "8px", padding: "10px" }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Describe your pitch"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ borderRadius: "8px", padding: "10px" }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4" style={{ backgroundColor: "#c7a034", border: "none", padding: "10px 30px", borderRadius: "8px" }}>
              <FaPaperPlane className="me-2" />
              Update Pitch
            </Button>
            <Button variant="secondary" onClick={handleCancel} className="mt-4 ms-3" style={{ padding: "10px 30px", borderRadius: "8px" }}>
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdatePitch;
