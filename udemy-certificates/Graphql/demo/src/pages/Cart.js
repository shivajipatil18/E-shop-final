import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import styled from 'styled-components';

const CartContainer = styled.div`
  padding: 2rem;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <CartContainer>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item, index) => (
          <CartItem key={index}>
            <div>{item.title}</div>
            <button>Remove</button>
          </CartItem>
        ))
      )}
    </CartContainer>
  );
};

export default Cart;
