import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams(); // Get productId from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details from the backend API using the productId
    fetch(`http://127.0.0.1:8000/api/products/${productId}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => setError(error.message));
  }, [productId]); // Re-run when productId changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img
        src={`http://127.0.0.1:8000${product.image}`} // Display image from the API
        alt={product.name}
        className='product-image'
      />
    </div>
  );
}

export default ProductDetail;
