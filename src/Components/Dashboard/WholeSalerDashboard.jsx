import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { FaMoneyCheckAlt, FaClipboardList, FaChartLine, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../utilis/axiosConfig";

const WholeSalerDashboard = ({ userId }) => {
  const navigate = useNavigate();

  const [wholesaler, setWholesaler] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/profiles/${userId}`);
        setWholesaler(response.data);
        setInvestments(response.data.investments || []);
        setEarnings(response.data.earnings || []);
      } catch (error) {
        console.error("Error fetching wholesaler data:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  if (!wholesaler) {
    return <div>Loading...</div>;
  }

  // Determine the title to display
  const dashboardTitle = wholesaler.name ? `${wholesaler.name}'s Dashboard` : "Dashboard";

  return (
    <Container fluid className="p-4">
      {/* Wholesaler Logo and Name Section */}
      <Row className="mb-4 text-center">
        <Col>
          {wholesaler.profile_picture ? (
            <img
              src={wholesaler.profile_picture}
              alt="Wholesaler Logo"
              style={{ width: '150px', height: 'auto' }}
            />
          ) : (
            <FaUser size={150} style={{ color: '#c7a034' }} /> // Default user icon
          )}
          <h1 style={{ color: "#c7a034" }}>{wholesaler.name || "User"}</h1>
          <p>{wholesaler.profile_description}</p>
        </Col>
      </Row>

      {/* Dashboard Title */}
      <h2 className="text-center" style={{ color: "#c7a034" }}>
        {dashboardTitle} {/* Use the determined title */}
      </h2>

      {/* Add Product and View Profile Buttons */}
      <Row className="mb-4">
        <Col className="text-end">
          <Button
            variant="success"
            onClick={handleAddProduct}
            style={{ marginBottom: '20px', marginRight: '10px' }}
          >
            Add Product
          </Button>
          <Button
            variant="info"
            onClick={handleViewProfile}
            style={{ marginBottom: '20px' }}
          >
            <FaUser className="me-2" /> View Profile
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaMoneyCheckAlt className="me-2" /> Total Investments
              </Card.Title>
              <Card.Text>{investments.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaClipboardList className="me-2" /> Total Earnings
              </Card.Title>
              <Card.Text>{earnings.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaChartLine className="me-2" /> Earnings Statistics
              </Card.Title>
              <Card.Text>View detailed earnings report</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h4 style={{ color: "white" }}>Current Investments</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Borrower</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                <tr key={investment.id}>
                  <td>{investment.id}</td>
                  <td>{investment.borrower}</td>
                  <td>${investment.amount}</td>
                  <td>{investment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h4 style={{ color: "white" }}>Earnings History</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((earning) => (
                <tr key={earning.id}>
                  <td>{earning.id}</td>
                  <td>{earning.date}</td>
                  <td>${earning.amount}</td>
                  <td>{earning.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default WholeSalerDashboard;
