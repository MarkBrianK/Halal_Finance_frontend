import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Alert } from "react-bootstrap";
import { FaMoneyBillAlt, FaClipboardCheck, FaHistory, FaUserEdit, FaSignOutAlt } from "react-icons/fa"; // Importing icons
import axios from 'axios'; // Import Axios

const BorrowerDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [error, setError] = useState('');

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loansResponse = await axios.get('http://127.0.0.1:3000/loans'); // Replace with your actual API endpoint
        setLoans(loansResponse.data);

        const paymentsResponse = await axios.get('http://127.0.0.1:3000/payments'); // Replace with your actual API endpoint
        setPaymentHistory(paymentsResponse.data);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="p-4">
      <h2 className="text-center" style={{ color: "#c7a034" }}>
        Borrower Dashboard
      </h2>
      {error && <Alert variant="danger">{error}</Alert>} {/* Display error message if any */}

      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaClipboardCheck className="me-2" /> Total Loans Applied
              </Card.Title>
              <Card.Text>{loans.length}</Card.Text> {/* Show total loans applied */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaMoneyBillAlt className="me-2" /> Total Loans Approved
              </Card.Title>
              <Card.Text>
                {loans.filter(loan => loan.status === "Approved").length} {/* Show total loans approved */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h4>
            <FaClipboardCheck className="me-2" />
            Current Loan Applications
          </h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>${loan.amount}</td>
                  <td>{loan.status}</td>
                  <td>{loan.dateApplied}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary" className="mt-3">
            <FaMoneyBillAlt className="me-2" />
            Apply for New Loan
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h4>
            <FaHistory className="me-2" />
            Payment History
          </h4>
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
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.date}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="secondary">
            <FaUserEdit className="me-2" />
            Update Profile
          </Button>
        </Col>
        <Col className="text-end">
          <Button variant="danger">
            <FaSignOutAlt className="me-2" />
            Log Out
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default BorrowerDashboard;
