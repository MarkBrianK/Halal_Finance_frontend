import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Alert } from "react-bootstrap";
import { FaMoneyBillAlt, FaClipboardCheck, FaHistory, FaWallet, FaBoxOpen, FaFileInvoice } from "react-icons/fa";
import axios from "../utilis/axiosConfig";

const CorporateDashboard = ({ userId }) => {
    const [loans, setLoans] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [wallet, setWallet] = useState({});
    const [orders, setOrders] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [loansResponse, paymentsResponse, walletResponse, ordersResponse, invoicesResponse] = await Promise.all([
                    axios.get('/loans'),
                    axios.get('/payments'),
                    axios.get(`/wallets/${userId}`),
                    axios.get('/orders'),
                    axios.get('/invoices')
                ]);

                setLoans(loansResponse.data);
                setPaymentHistory(paymentsResponse.data);
                setWallet(walletResponse.data);
                setOrders(ordersResponse.data);
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
            setInvoices((prevInvoices) =>
                prevInvoices.map((invoice) =>
                    invoice.id === invoiceId ? { ...invoice, status: 'confirmed' } : invoice
                )
            );
        } catch (err) {
            setError('Error confirming invoice. Please try again later.');
            console.error(err);
        }
    };

    // Function to calculate due dates for each installment
    const calculateDueDates = (createdAt, paymentSchedule) => {
        const dueDates = [];
        const creationDate = new Date(createdAt);

        paymentSchedule.forEach((payment, index) => {
            const dueDate = new Date(creationDate);
            dueDate.setMonth(dueDate.getMonth() + index + 1); // Set due date for the next months
            dueDates.push({
                ...payment,
                due_date: dueDate.toISOString().split('T')[0], // Format the date
                amount_due: Math.ceil(parseFloat(payment.amount_due)) // Round up to the nearest whole number
            });
        });

        return dueDates;
    };

    return (
        <Container fluid className="p-4">
            <h2 className="text-center text-white font-weight-bold">Dashboard</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Summary Cards */}
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
                            <Card.Text>Ksh {wallet?.balance || 0}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Current Loan Applications */}
            <Row className="mb-4">
                <Col md={6}>
                    <h4 className="text-white">
                        <FaClipboardCheck className="me-2" /> Current Loan Applications
                    </h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Payment Schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => {
                                // Parse the payment_schedule from JSON string to JavaScript object
                                const paymentSchedule = JSON.parse(loan.payment_schedule);
                                const paymentScheduleWithDueDates = calculateDueDates(loan.created_at, paymentSchedule);

                                return (
                                    <tr key={loan.id}>
                                        <td>{loan.id}</td>
                                        <td>Ksh {loan.amount}</td>
                                        <td>{loan.status}</td>
                                        <td>
                                            {paymentScheduleWithDueDates.map((p) => (
                                                <div key={p.month}>
                                                    Month {p.month}: Ksh {p.amount_due} - {p.status} - Due: {new Date(p.due_date).toLocaleDateString()}
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Button variant="primary" className="mt-3">
                        <FaMoneyBillAlt className="me-2" /> Apply for New Loan
                    </Button>
                </Col>

                {/* Payment History */}
                <Col md={6}>
                    <h4 className="text-white">
                        <FaHistory className="me-2" /> Payment History
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
                                    <td>{payment.payment_date}</td>
                                    <td>Ksh {payment.amount}</td>
                                    <td>{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* Recent Orders */}
            <Row className="mb-4">
                <Col>
                    <h4 className="text-white">
                        <FaBoxOpen className="me-2" /> Recent Orders
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

            {/* Invoices */}
            <Row className="mb-4">
                <Col>
                    <h4 className="text-white">
                        <FaFileInvoice className="me-2" /> Invoices
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
                                        <Button
                                            variant="success"
                                            onClick={() => confirmInvoice(invoice.id)}
                                            disabled={invoice.status === 'confirmed'}
                                        >
                                            Confirm
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default CorporateDashboard;
