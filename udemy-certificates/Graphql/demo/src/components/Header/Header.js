import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #222;
  padding: 1rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  return (
    <Nav>
      <Link to="/" style={{ color: 'white' }}>🛍 MyShop</Link>
      <Link to="/cart" style={{ color: 'white' }}>Cart 🛒</Link>
    </Nav>
  );
};

export default Header;
