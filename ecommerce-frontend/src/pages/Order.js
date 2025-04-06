import React, { useState, useEffect } from 'react';
import './Order.css';

function Order() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // This is a mockup. You'd typically fetch the order data from your backend.
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      setOrder({
        items: cart,
        totalPrice: cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
      });
    }
  }, []);

  if (!order) {
    return <div>Loading order...</div>;
  }

  return (
    <div className='order-container'>
      <h1>Order Summary</h1>
      <div className='order-details'>
        <h2>Customer Information</h2>
        <p>Name: {order.customerName}</p>
        <p>Email: {order.customerEmail}</p>
        <h2>Items</h2>
        {order.items.map((item) => (
          <div key={item.id} className='order-item'>
            <img
              src={`http://127.0.0.1:8000${item.image}`}
              alt={item.name}
              className='order-item-image'
            />
            <div className='order-item-details'>
              <h3>{item.name}</h3>
              <p>
                ${item.price} x {item.quantity}
              </p>
            </div>
          </div>
        ))}
        <div className='order-summary'>
          <h3>Total: ${order.totalPrice.toFixed(2)}</h3>
          <button className='confirm-order-btn'>Confirm Order</button>
        </div>
      </div>
    </div>
  );
}

export default Order;
