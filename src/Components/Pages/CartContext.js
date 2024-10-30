import React, { createContext, useContext, useState } from 'react';
import axios from '../utilis/axiosConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product) => {
    try {

      setCartItems((prevItems) => [...prevItems, product]);


      await axios.post('/cart_items', { product_id: product.id, quantity: 1 });
    } catch (error) {
      console.error('Error adding to cart:', error);

    }
  };

  const getCartCount = () => {
    return cartItems.length; 
  };

  return (
    <CartContext.Provider value={{ addToCart, cartItems, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
