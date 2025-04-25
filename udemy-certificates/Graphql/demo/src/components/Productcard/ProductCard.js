import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: #f9f9f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    ${Card}:hover & {
      transform: scale(1.05);
    }
  }
`;

const Title = styled.h3`
  font-size: 1.1rem;
  padding: 1rem;
  color: #333;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ProductCard = ({ product }) => {
  return (
    <StyledLink to={`/product/${product.id}`}>
      <Card>
        <ImageWrapper>
          <img src={product.images.edges[0]?.node.url} alt={product.title} />
        </ImageWrapper>
        <Title>{product.title}</Title>
      </Card>
    </StyledLink>
  );
};

export default ProductCard;
