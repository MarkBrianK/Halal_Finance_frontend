import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import UpdatePitch from './UpdatePitch';
import { FaCheckCircle, FaClock, FaTimesCircle, FaEdit } from 'react-icons/fa';

const PitchList = ({ showAllPitches, showMyPitches, showInvestorPitches, userId }) => {
  const [pitches, setPitches] = useState([]);
  const [filteredPitches, setFilteredPitches] = useState([]);
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/pitches');
        setPitches(response.data);
        setFilteredPitches(response.data); // Initially set all pitches
      } catch (err) {
        setError('Error fetching pitches. Please try again later.');
      }
    };

    fetchPitches();
  }, []); // This runs once to fetch all pitches

  useEffect(() => {
    if (showAllPitches) {
      setFilteredPitches(pitches);
    } else if (showMyPitches && userId) {
      const userPitches = pitches.filter(pitch => pitch.user_id === userId);
      setFilteredPitches(userPitches);
    } else if (showInvestorPitches) {
      setFilteredPitches(pitches);
    }
  }, [showAllPitches, showMyPitches, showInvestorPitches, pitches,userId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  const handleUpdateClick = (pitch) => {
    setSelectedPitch(pitch);
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FaCheckCircle style={{ color: 'green' }} />;
      case 'pending':
        return <FaClock style={{ color: 'orange' }} />;
      case 'rejected':
        return <FaTimesCircle style={{ color: 'red' }} />;
      default:
        return null;
    }
  };

  return (
    <Container className="p-4">
      {selectedPitch ? (
        <UpdatePitch pitch={selectedPitch} setSelectedPitch={setSelectedPitch} />
      ) : (
        <>
          <h2 className="text-center" style={{ color: "grey" }}>
            {showAllPitches ? "All Pitches" : showMyPitches ? "My Pitches" : "Available Pitches"}
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Amount Requested (KSH)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPitches.length > 0 ? filteredPitches.map((pitch, index) => (
                <tr key={pitch.id}>
                  <td>{index + 1}</td>
                  <td>{pitch.title}</td>
                  <td>{pitch.description}</td>
                  <td>{formatCurrency(pitch.amount_requested)}</td>
                  <td>
                    {renderStatusIcon(pitch.status)} {pitch.status.charAt(0).toUpperCase() + pitch.status.slice(1)}
                  </td>
                  <td>
                    {pitch.status === 'pending' && (
                      <Button
                        variant="warning"
                        onClick={() => handleUpdateClick(pitch)}
                      >
                        <FaEdit className="me-2" /> Edit
                      </Button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center">No pitches available.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default PitchList;
