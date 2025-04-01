import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ products }) {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Display additional product details */}
    </div>
  );
}

export default ProductDetail;
