import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Show modal confirmation
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Simulate a delay for logout
      localStorage.removeItem('token');
      setTimeout(() => {
        navigate('/');
        setIsLoading(false);
      }, 1000);  // Redirect after 1 second
    } catch (error) {
      setIsLoading(false);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Logout
      </Button>

      {/* Modal for Logout Confirmation */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Logout'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Logout;
