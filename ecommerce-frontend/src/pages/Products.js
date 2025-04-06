import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

function Products() {
  const [products, setProducts] = useState(null);
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
    <div className='product-list-container'>
      {products.map((product) => (
        <div className='product-item' key={product.id}>
          <img
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.name}
            className='product-image'
          />
          <div className='product-details'>
            <h2 className='product-name'>{product.name}</h2>
            <p className='product-description'>{product.description}</p>
            <p className='product-price'>${product.price}</p>
            <Link to={`/products/${product.id}`} className='view-details-btn'>
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
