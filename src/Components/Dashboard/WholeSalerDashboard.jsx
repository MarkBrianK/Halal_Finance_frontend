import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, } from "react-bootstrap";
import { FaMoneyCheckAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../utilis/axiosConfig";
import Wallet from "../Pages/Wallet";

const WholeSalerDashboard = ({ userId }) => {
  const navigate = useNavigate();
  const [wholesaler, setWholesaler] = useState(null);
  const [earnings, setEarnings] = useState(0);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wholesalerResponse = await axios.get(`/profiles/${userId}`);
        setWholesaler(wholesalerResponse.data);

        const ordersResponse = await axios.get("/orders");
        const filteredOrders = ordersResponse.data.filter(
          (order) => order.product.user_id.toString() === userId.toString()
        );
        const totalEarnings = filteredOrders.reduce((sum, order) => sum + parseFloat(order.total_price || 0), 0);

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

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      await axios.put(`/orders/${orderId}`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status } : order))
      );
    } catch (error) {
      setError(`Failed to ${status} the order. Please try again later.`);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <Container fluid className="p-4" style={{ color: "white" }}>
      <Row className="mb-4 text-center">
        <Col>
          <div className="wholesaler-info rounded-circle mb-3">
            {wholesaler?.profile_picture ? (
              <img src={wholesaler.profile_picture} alt="Wholesaler Logo" className="img-fluid rounded-circle" style={{ width: '150px' }} />
            ) : (
              <FaUser size={150} style={{ color: '#c7a034' }} />
            )}
          </div>
          <h1 className="text-white">{wholesaler?.name || "User"}</h1>
          <p>{wholesaler?.profile_description}</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="text-end">
          <Button variant="success" onClick={handleAddProduct} className="me-2 mb-2">Add Product</Button>
          <Button variant="info" onClick={handleViewProfile} className="mb-2"><FaUser className="me-2" /> View Profile</Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Wallet userId={userId} /> {/* Render Wallet component here */}
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title style={{ color: "white" }}><FaMoneyCheckAlt className="me-2" /> Total Earnings</Card.Title>
              <Card.Text>Ksh {earnings.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h4 className="text-white">Orders</h4>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{order.total_price}</td>
                  <td>
                    {order.status !== "confirmed" && (
                      <>
                        <Button variant="success" onClick={() => handleOrderStatusChange(order.id, "confirmed")} className="me-2">
                          Approve
                        </Button>
                        <Button variant="danger" onClick={() => handleOrderStatusChange(order.id, "declined")}>
                          Reject
                        </Button>
                      </>
                    )}
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

export default WholeSalerDashboard;
