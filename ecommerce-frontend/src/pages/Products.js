import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState(null); // Initialize as null to differentiate between loading and empty states
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products === null) {
    return <div>Loading products...</div>;
  }

  if (products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          {/* Render product details here */}
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          {/* Add more product details as needed */}
          <Link to={`/products/${product.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default Products;
