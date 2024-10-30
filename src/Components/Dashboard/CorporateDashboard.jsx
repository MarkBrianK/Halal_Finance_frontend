import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Alert } from "react-bootstrap";
import { FaMoneyBillAlt, FaClipboardCheck, FaHistory, FaWallet, FaBoxOpen, FaFileInvoice } from "react-icons/fa";
import axios from "../utilis/axiosConfig";

const CorporateDashboard = ({ userId }) => {
    const [data, setData] = useState({
        loans: [],
        paymentHistory: [],
        wallet: {},
        orders: [],
        invoices: []
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [loansRes, paymentsRes, walletRes, ordersRes, invoicesRes] = await Promise.all([
                    axios.get('/loans'),
                    axios.get('/payments'),
                    axios.get(`/wallets/${userId}`),
                    axios.get('/orders'),
                    axios.get('/invoices')
                ]);
                setData({
                    loans: loansRes.data,
                    paymentHistory: paymentsRes.data,
                    wallet: walletRes.data,
                    orders: ordersRes.data,
                    invoices: invoicesRes.data
                });
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
            setData((prevData) => ({
                ...prevData,
                invoices: prevData.invoices.map(invoice =>
                    invoice.id === invoiceId ? { ...invoice, status: 'confirmed' } : invoice
                )
            }));
        } catch (err) {
            setError('Error confirming invoice. Please try again later.');
            console.error(err);
        }
    };

    const calculateDueDates = (createdAt, paymentSchedule) => {
        const creationDate = new Date(createdAt);
        return paymentSchedule.map((payment, index) => ({
            ...payment,
            due_date: new Date(creationDate.setMonth(creationDate.getMonth() + index + 1)).toLocaleDateString(),
            amount_due: Math.ceil(parseFloat(payment.amount_due))
        }));
    };

    const SummaryCard = ({ icon, title, value }) => (
        <Col md={4}>
            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Title>{icon} {title}</Card.Title>
                    <Card.Text>{value}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );

    return (
        <Container fluid className="p-4">
            <h2 className="text-center text-white font-weight-bold">Dashboard</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mb-4">
                <SummaryCard icon={<FaClipboardCheck />} title="Total Loans Applied" value={data.loans.length} />
                <SummaryCard icon={<FaMoneyBillAlt />} title="Total Loans Approved" value={data.loans.filter(loan => loan.status === "active").length} />
                <SummaryCard icon={<FaWallet />} title="Wallet Balance" value={`Ksh ${data.wallet?.balance || 0}`} />
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <h4 className="text-white"><FaClipboardCheck /> Current Loan Applications</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr><th>#</th><th>Amount</th><th>Status</th><th>Payment Schedule</th></tr>
                        </thead>
                        <tbody>
                            {data.loans.map((loan) => (
                                <tr key={loan.id}>
                                    <td>{loan.id}</td>
                                    <td>Ksh {loan.amount}</td>
                                    <td>{loan.status}</td>
                                    <td>
                                        {calculateDueDates(loan.created_at, JSON.parse(loan.payment_schedule)).map((p, index) => (
                                            <div key={index}>
                                                Month {p.month}: Ksh {p.amount_due} - {p.status} - Due: {p.due_date}
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button variant="primary" className="mt-3"><FaMoneyBillAlt /> Apply for New Loan</Button>
                </Col>
                <Col md={6}>
                    <h4 className="text-white"><FaHistory /> Payment History</h4>
                    <Table striped bordered hover>
                        <thead><tr><th>#</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
                        <tbody>
                            {data.paymentHistory.map((payment) => (
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

            <Row className="mb-4">
                <Col>
                    <h4 className="text-white"><FaBoxOpen /> Recent Orders</h4>
                    <Table striped bordered hover>
                        <thead><tr><th>#</th><th>Product</th><th>Quantity</th><th>Total Price</th><th>Status</th></tr></thead>
                        <tbody>
                            {data.orders.map((order) => (
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

            <Row className="mb-4">
                <Col>
                    <h4 className="text-white"><FaFileInvoice /> Invoices</h4>
                    <Table striped bordered hover>
                        <thead><tr><th>#</th><th>Order ID</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {data.invoices.map((invoice) => (
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
                                        >Confirm</Button>
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
