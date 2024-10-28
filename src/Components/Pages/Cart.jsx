import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card, ListGroup, Alert } from 'react-bootstrap';
import axios from '../utilis/axiosConfig';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Initialize as a number
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  // Fetch cart items
  const fetchCartItems = useCallback(async () => {
    try {
      const response = await axios.get('/cart');
      const items = response.data.cart_items || []; // Ensure items is an array
      setCartItems(items);
      setIsCartEmpty(items.length === 0);
      calculateTotalPrice(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      const price = parseFloat(item.total_price) || 0; // Convert string to float
      return acc + price;
    }, 0);
    setTotalPrice(total);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`/cart_items/${itemId}`);
      alert("Item removed from cart.");
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
      alert("Failed to remove item. Please try again.");
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete('/cart/clear_cart');
      setCartItems([]);
      setTotalPrice(0);
      setIsCartEmpty(true);
      alert("Cart cleared successfully!");
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert("Failed to clear cart. Please try again.");
    }
  };

  const handleCheckout = async () => {
    try {
      const orderData = cartItems.map(item => ({
        product_id: item.product?.id, // Use optional chaining
        quantity: item.quantity,
        total_price: parseFloat(item.total_price) || 0, // Ensure total_price is a number
      })).filter(item => item.product_id); // Filter out items without product_id

      await axios.post('/orders', { order: orderData });
      alert("Checkout successful!");
      handleClearCart();
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <Card className="cart">
      <Card.Header as="h2">Your Cart</Card.Header>
      <ListGroup variant="flush">
        {isCartEmpty ? (
          <Alert variant="info" className="m-3">
            Your cart is currently empty.
          </Alert>
        ) : (
          cartItems.map((item) => (
            <ListGroup.Item key={item.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.product ? item.product.name : "Unnamed Product"}</h5>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: Ksh {parseFloat(item.total_price).toFixed(2) || '0.00'}</p> {/* Ensure proper formatting */}
                </div>
                <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <h4>Total: Ksh {totalPrice.toFixed(2)}</h4> {/* Ensure totalPrice is a number */}
        <div>
          <Button variant="secondary" onClick={handleClearCart}>
            Clear Cart
          </Button>
          <Button variant="success" className="ms-2" onClick={handleCheckout} disabled={isCartEmpty}>
            Checkout
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
