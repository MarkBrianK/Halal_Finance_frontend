// src/Components/Dashboard/InvestorDashboard.js
import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { FaMoneyCheckAlt, FaClipboardList, FaChartLine } from "react-icons/fa";

const WholeSalerDashboard = () => {
  // Sample data
  const investments = [
    { id: 1, borrower: "John Doe", amount: 5000, status: "Invested" },
    { id: 2, borrower: "Alice Johnson", amount: 3000, status: "Pending" },
  ];

  const earnings = [
    { id: 1, date: "2024-01-20", amount: 250, status: "Paid" },
    { id: 2, date: "2024-02-20", amount: 100, status: "Pending" },
  ];

  return (
    <Container fluid className="p-4">
      <h2 className="text-center" style={{ color: "#c7a034" }}>
        Investor Dashboard
      </h2>
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
          <h4>Current Investments</h4>
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
          <h4>Earnings History</h4>
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
