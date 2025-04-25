import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #222;
  color: #fff;
  padding: 1rem;
  text-align: center;
`;

const Footer = () => {
  return <FooterContainer>© 2025 MyShop. All rights reserved.</FooterContainer>;
};

export default Footer;
