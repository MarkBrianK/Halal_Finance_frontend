import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import UpdatePitch from './UpdatePitch';

const PitchList = ({ showAllPitches, showMyPitches, showInvestorPitches }) => {
  const [pitches, setPitches] = useState([]);
  const [filteredPitches, setFilteredPitches] = useState([]);
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/pitches');
        setPitches(response.data);
        setFilteredPitches(response.data);
      } catch (err) {
        setError('Error fetching pitches. Please try again later.');
      }
    };

    fetchPitches();
  }, []);

  useEffect(() => {
    if (showAllPitches) {
      setFilteredPitches(pitches);
    } else if (showMyPitches) {
      const userId = 1; // Replace with the actual user ID
      const userPitches = pitches.filter(pitch => pitch.user_id === userId);
      setFilteredPitches(userPitches);
    } else if (showInvestorPitches) {
      setFilteredPitches(pitches);
    }
  }, [showAllPitches, showMyPitches, showInvestorPitches, pitches]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  const handleUpdateClick = (pitch) => {
    setSelectedPitch(pitch); // Set the selected pitch for updating
  };

  return (
    <Container className="p-4">
      {selectedPitch ? (
        <UpdatePitch pitch={selectedPitch} setSelectedPitch={setSelectedPitch} /> // Passing selectedPitch to UpdatePitch
      ) : (
        <>
          <h2 className="text-center" style={{ color: "#c7a034" }}>
            {showAllPitches ? "All Pitches" : showMyPitches ? "Your Pitches" : "Available Pitches"}
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Amount Requested (KSH)</th>
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
                    <Button
                      variant="warning"
                      onClick={() => handleUpdateClick(pitch)}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center">No pitches available.</td>
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
