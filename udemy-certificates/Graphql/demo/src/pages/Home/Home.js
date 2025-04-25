import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from './../../graphql/queries';
import ProductCard from '../../components/Productcard/ProductCard';

const Home = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '2rem' }}>
      {data.products.edges.map(({ node }) => (
        <ProductCard key={node.id} product={node} />
      ))}
    </div>
  );
};

export default Home;
