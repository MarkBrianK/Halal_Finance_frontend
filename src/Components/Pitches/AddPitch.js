import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import axios from 'axios';

const AddPitch = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amountRequested, setAmountRequested] = useState(0);
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:3000/pitches', {
        title,
        description,
        amount_requested: amountRequested,
        status,
        user_id: 1
      });

      setSuccess("Pitch successfully added!");
      setError("");

      setTitle("");
      setDescription("");
      setAmountRequested(0);
      setStatus("draft");
    } catch (err) {
      setError("Error adding pitch. Please try again.");
      setSuccess("");
      console.error(err);
    }
  };

  return (
    <Container className="p-4">
      <Card style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: "#c7a034", fontWeight: "bold" }}>
            Add a New Pitch
          </h2>

          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

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
              Submit Pitch
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddPitch;
