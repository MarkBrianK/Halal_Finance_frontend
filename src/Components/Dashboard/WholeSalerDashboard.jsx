import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Modal, Form } from "react-bootstrap";
import { FaMoneyCheckAlt, FaUser, FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../utilis/axiosConfig";

const WholeSalerDashboard = ({ userId }) => {
  const navigate = useNavigate();
  const [wholesaler, setWholesaler] = useState(null);
  const [earnings, setEarnings] = useState(0); // Changed to number
  const [walletBalance, setWalletBalance] = useState(0);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [amount, setAmount] = useState(0);
  const [usageLimit, setUsageLimit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch wholesaler profile data
        const wholesalerResponse = await axios.get(`/profiles/${userId}`);
        setWholesaler(wholesalerResponse.data);
        setWalletBalance(wholesalerResponse.data.wallet.balance || 0);

        // Fetch orders
        const ordersResponse = await axios.get("/orders");
        const filteredOrders = ordersResponse.data.filter(
          (order) => order.product.user_id.toString() === userId.toString()
        );

        // Calculate total earnings from all orders
        const totalEarnings = filteredOrders.reduce((sum, order) => {
          const price = parseFloat(order.total_price); // Convert to float
          return sum + (isNaN(price) ? 0 : price); // Sum up, handle NaN
        }, 0);

        setEarnings(totalEarnings);
        setOrders(filteredOrders);
      } catch (error) {
        setError("Failed to load wholesaler or orders data. Please try again later.");
      }
    };

    fetchData();
  }, [userId]);

  const handleAddProduct = () => navigate('/add-product');
  const handleViewProfile = () => navigate('/wholesaler/me');

  const openModal = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  const handleModalSubmit = async () => {
    try {
      if (modalAction === "add") {
        await axios.post('/wallet/add-funds', { amount });
        setWalletBalance((prev) => prev + parseFloat(amount));
      } else if (modalAction === "withdraw") {
        await axios.post('/wallet/withdraw', { amount });
        setWalletBalance((prev) => prev - parseFloat(amount));
      }
    } catch (error) {
      setError(`Failed to ${modalAction} funds. Please try again later.`);
    } finally {
      setShowModal(false);
      setAmount(0);
    }
  };

  const handleAmountChange = (e) => setAmount(e.target.value);

  const handleApproveOrder = async (orderId) => {
    try {
      await axios.put(`/orders/${orderId}`, { status: "confirmed" });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "confirmed" } : order
        )
      );
    } catch (error) {
      setError("Failed to approve the order. Please try again later.");
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      await axios.put(`/orders/${orderId}`, { status: "declined" });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "declined" } : order
        )
      );
    } catch (error) {
      setError("Failed to reject the order. Please try again later.");
    }
  };

  const handleUsageLimitChange = async (e) => {
    const value = parseFloat(e.target.value);
    setUsageLimit(value);

    try {
      await axios.put(`/profiles/${userId}/usage-limit`, { limit: value });
    } catch (error) {
      setError("Failed to update usage limit. Please try again later.");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <Container fluid className="p-4">
      {/* Wholesaler Profile Section */}
      <Row className="mb-4 text-center">
        <Col>
          {wholesaler?.profile_picture ? (
            <img src={wholesaler.profile_picture} alt="Wholesaler Logo" style={{ width: '150px', height: 'auto' }} />
          ) : (
            <FaUser size={150} style={{ color: '#c7a034' }} />
          )}
          <h1 style={{ color: "#c7a034" }}>{wholesaler?.name || "User"}</h1>
          <p>{wholesaler?.profile_description}</p>
        </Col>
      </Row>

      <h2 className="text-center" style={{ color: "#c7a034" }}>
        {wholesaler?.name ? `${wholesaler.name}'s Dashboard` : "Dashboard"}
      </h2>

      {/* Wallet, Earnings */}
      <Row className="mb-4">
        <Col className="text-end">
          <Button variant="success" onClick={handleAddProduct} className="me-2 mb-2">
            Add Product
          </Button>
          <Button variant="info" onClick={handleViewProfile} className="mb-2">
            <FaUser className="me-2" /> View Profile
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title><FaWallet className="me-2" /> Wallet Balance</Card.Title>
              <Card.Text>Ksh {walletBalance}</Card.Text>
              <Button variant="primary" onClick={() => openModal("add")} className="me-2">Add Funds</Button>
              <Button variant="danger" onClick={() => openModal("withdraw")}>Withdraw</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title><FaMoneyCheckAlt className="me-2" /> Total Earnings</Card.Title>
              <Card.Text>Ksh {earnings.toFixed(2)}</Card.Text> {/* Displaying total earnings with two decimal points */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Usage Limit */}
      <Row className="mb-4">
        <Col>
          <h4 style={{ color: "white" }}>Set Usage Limit</h4>
          <Form.Group>
            <Form.Label>Usage Limit (Ksh)</Form.Label>
            <Form.Control
              type="range"
              min="0"
              max={walletBalance}
              value={usageLimit}
              onChange={handleUsageLimitChange}
              step="100"
            />
            <Form.Text className="text-muted">Current Limit: Ksh {usageLimit}</Form.Text>
          </Form.Group>
        </Col>
      </Row>

      {/* Orders Section */}
      <Row>
        <Col>
          <h4 style={{ color: "#c7a034" }}>Your Orders</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Order Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.product.name}</td>
                    <td>{order.quantity}</td>
                    <td>{order.total_price}</td>
                    <td>{order.status}</td>
                    <td>
                      {order.status === "pending" && (
                        <>
                          <Button
                            variant="success"
                            onClick={() => handleApproveOrder(order.id)}
                            className="me-2"
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleRejectOrder(order.id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal for Wallet Actions */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalAction === "add" ? "Add Funds" : "Withdraw Funds"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Amount (Ksh)</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            {modalAction === "add" ? "Add" : "Withdraw"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default WholeSalerDashboard;
