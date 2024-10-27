import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "../utilis/axiosConfig";

const Order = ({ orderId, onClearOrder }) => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(`/orders/${orderId}`);
        setOrderItems(response.data.items || []);
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    };

    if (orderId) {
      fetchOrderItems();
    }
  }, [orderId]);

  return (
    <div>
      <h3>Current Order</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <tr key={item.product_id}>
              <td>{item.product_name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="danger" onClick={onClearOrder}>
        Clear Order
      </Button>
    </div>
  );
};

export default Order;
