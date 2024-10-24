import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Alert } from "react-bootstrap";
import { FaMoneyBillAlt, FaClipboardCheck, FaHistory, FaUserEdit, FaWallet, FaBoxOpen } from "react-icons/fa";
import axios from 'axios';

const BorrowerDashboard = () => {
    const [loans, setLoans] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [wallet, setWallet] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Loans
                const loansResponse = await axios.get('http://127.0.0.1:3000/loans'); // Replace with your API endpoint
                setLoans(loansResponse.data);

                // Fetch Payments
                const paymentsResponse = await axios.get('http://127.0.0.1:3000/payments'); // Replace with your API endpoint
                setPaymentHistory(paymentsResponse.data);

                // Fetch Wallet Data
                const walletResponse = await axios.get('http://127.0.0.1:3000/wallet'); // Replace with your API endpoint
                setWallet(walletResponse.data);

                // Fetch Transactions
                const transactionsResponse = await axios.get('http://127.0.0.1:3000/transactions'); // Replace with your API endpoint
                setTransactions(transactionsResponse.data);

                // Fetch Orders
                const ordersResponse = await axios.get('http://127.0.0.1:3000/orders'); // Replace with your API endpoint
                setOrders(ordersResponse.data);

            } catch (err) {
                setError('Error fetching data. Please try again later.');
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <Container fluid className="p-4">
            <h2 className="text-center" style={{ color: "grey", fontWeight: "bold" }}>
                Dashboard
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mb-4">
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaClipboardCheck className="me-2" /> Total Loans Applied
                            </Card.Title>
                            <Card.Text>{loans.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaMoneyBillAlt className="me-2" /> Total Loans Approved
                            </Card.Title>
                            <Card.Text>
                                {loans.filter(loan => loan.status === "Approved").length}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <FaWallet className="me-2" /> Wallet Balance
                            </Card.Title>
                            <Card.Text>${wallet.balance || 0}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
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

                <Col md={6}>
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

            <Row className="mb-4">
                <Col>
                    <h4>
                        <FaBoxOpen className="me-2" />
                        Recent Orders
                    </h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.product_name}</td>
                                    <td>{order.quantity}</td>
                                    <td>${order.total_price}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <h4>
                        <FaHistory className="me-2" />
                        Transaction History
                    </h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.transaction_type}</td>
                                    <td>${transaction.amount}</td>
                                    <td>{transaction.created_at}</td>
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
            </Row>
        </Container>
    );
};

export default BorrowerDashboard;
