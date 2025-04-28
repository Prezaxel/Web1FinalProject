import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    return (
        <div style={{ padding: '1rem', flex: 1 }}>
            <h2>🛒 Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} style={{
                            background: '#fff',
                            padding: '1rem',
                            borderRadius: '8px',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                            marginBottom: '1rem'
                        }}>
                            <h3>{item.name}</h3>
                            <p>Price: C${item.price.toFixed(2)}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity === 1}
                                    style={{ background: '#ddd', padding: '0.3rem 0.8rem' }}
                                >
                                    -
                                </button>
                                <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    style={{ background: '#ddd', padding: '0.3rem 0.8rem' }}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                style={{
                                    background: 'red',
                                    color: 'white',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '4px'
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div style={{ marginTop: '2rem' }}>
                        <p><strong>Total Items:</strong> {totalItems}</p>
                        <p><strong>Total Price:</strong> C${totalPrice}</p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button
                                onClick={() => navigate('/')}
                                style={{ background: '#03a9f4', color: 'white' }}
                            >
                                Continue Shopping
                            </button>
                            <button
                                onClick={() => navigate('/checkout')}
                                style={{ background: '#28a745', color: 'white' }}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;
