import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Alert } from "react-bootstrap";
import { FaMoneyBillAlt, FaClipboardCheck, FaHistory, FaUserEdit, FaWallet, FaBoxOpen, FaFileInvoice } from "react-icons/fa";
import axios from "../utilis/axiosConfig";

const CorporateDashboard = ({ userId }) => {
    const [loans, setLoans] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [wallet, setWallet] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [orders, setOrders] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loansResponse = await axios.get('/loans');
                setLoans(loansResponse.data);

                const paymentsResponse = await axios.get('/payments');
                setPaymentHistory(paymentsResponse.data);

                const walletResponse = await axios.get(`/wallets/${userId}`);
                setWallet(walletResponse.data);

                const transactionsResponse = await axios.get('/transactions');
                setTransactions(transactionsResponse.data);

                const ordersResponse = await axios.get('/orders');
                setOrders(ordersResponse.data);

                const invoicesResponse = await axios.get('/invoices');
                setInvoices(invoicesResponse.data);

            } catch (err) {
                setError('Error fetching data. Please try again later.');
                console.error(err);
            }
        };

        fetchData();
    }, [userId]);

    const confirmInvoice = async (invoiceId) => {
        try {
            await axios.patch(`/invoices/${invoiceId}`, { status: 'confirmed' });
            setInvoices(prevInvoices =>
                prevInvoices.map(invoice =>
                    invoice.id === invoiceId ? { ...invoice, status: 'confirmed' } : invoice
                )
            );
        } catch (err) {
            setError('Error confirming invoice. Please try again later.');
            console.error(err);
        }
    };

    return (
        <Container fluid className="p-4">
            <h2 className="text-center" style={{ color: "white", fontWeight: "bold" }}>
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
                                {loans.filter(loan => loan.status === "active").length}
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
                            <Card.Text>Ksh {wallet && wallet.balance ? wallet.balance : 0}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <h4 style={{color:"white"}}>
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
                                    <td>Ksh {loan.amount}</td>
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
                    <h4 style={{color:"white"}}>
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
                                    <td>Ksh {payment.amount}</td>
                                    <td>{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <h4 style={{color:"white"}}>
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
                                    <td>{order.product.name}</td>
                                    <td>{order.quantity}</td>
                                    <td>Ksh {order.total_price}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* Invoices Table */}
            <Row className="mb-4">
                <Col>
                    <h4 style={{color:"white"}}>
                        <FaFileInvoice className="me-2" />
                         Invoices
                    </h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td>{invoice.id}</td>
                                    <td>{invoice.order_id}</td>
                                    <td>Ksh {invoice.amount}</td>
                                    <td>{invoice.status}</td>
                                    <td>
                                        {invoice.status !== 'confirmed' && (
                                            <Button variant="success" onClick={() => confirmInvoice(invoice.id)}>
                                                Confirm
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <h4 style={{color:"white"}}>
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

export default CorporateDashboard;
