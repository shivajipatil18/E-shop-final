import React from 'react';

function SearchResults({ results }) {
  return (
    <ul>
      {results.map((result, index) => (
        <li key={index}>{result}</li>
      ))}
    </ul>
  );
}

export default SearchResults;