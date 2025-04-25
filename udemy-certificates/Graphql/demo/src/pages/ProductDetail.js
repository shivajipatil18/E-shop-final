import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext'
import { useContext } from 'react';

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      title
      description
      images(first: 5) {
        edges {
          node {
            url
          }
        }
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;

  const product = data.product;

  return (
    <Container>
      <img
        src={product.images.edges[0]?.node.url}
        alt={product.title}
        style={{ width: '300px', borderRadius: '8px' }}
      />
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <button onClick={() => addToCart(product)}>Add to Cart 🛒</button>
      </div>
    </Container>
  );
};

export default ProductDetail;
