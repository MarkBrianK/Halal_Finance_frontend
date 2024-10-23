// src/Components/Dashboard/AdminDashboard.js
import React from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { FaUsers, FaClipboardCheck, FaChartBar } from "react-icons/fa";

const AdminDashboard = () => {
  // Sample data
  const users = [
    { id: 1, name: "John Doe", role: "Borrower", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Investor", status: "Active" },
  ];

  const loanApplications = [
    { id: 1, borrower: "John Doe", amount: 5000, status: "Approved" },
    { id: 2, borrower: "Alice Johnson", amount: 3000, status: "Pending" },
  ];

  return (
    <Container fluid className="p-4">
      <h2 className="text-center" style={{ color: "#c7a034" }}>
        Admin Dashboard
      </h2>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaUsers className="me-2" /> Total Users
              </Card.Title>
              <Card.Text>{users.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaClipboardCheck className="me-2" /> Total Loans
              </Card.Title>
              <Card.Text>{loanApplications.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FaChartBar className="me-2" /> Loan Statistics
              </Card.Title>
              <Card.Text>View reports</Card.Text>
              <Button variant="primary">View Reports</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h4>Loan Applications</h4>
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
              {loanApplications.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.borrower}</td>
                  <td>${loan.amount}</td>
                  <td>{loan.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
