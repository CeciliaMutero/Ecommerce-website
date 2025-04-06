import React, { useState, useEffect } from 'react';
import './Cart.css';

function Cart() {
  // We'll use localStorage for the cart (for simplicity)
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
  }, [cart]);

  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleChangeQuantity = (id, action) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === 'increase' ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      )
    );
  };

  return (
    <div className='cart-container'>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className='cart-items'>
            {cart.map((item) => (
              <div key={item.id} className='cart-item'>
                <img
                  src={`http://127.0.0.1:8000${item.image}`}
                  alt={item.name}
                  className='cart-item-image'
                />
                <div className='cart-item-details'>
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <div className='cart-item-quantity'>
                    <button
                      onClick={() => handleChangeQuantity(item.id, 'decrease')}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleChangeQuantity(item.id, 'increase')}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className='remove-item-btn'
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='cart-summary'>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className='checkout-btn'>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
