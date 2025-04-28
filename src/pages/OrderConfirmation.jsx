import { Link } from 'react-router-dom';

function OrderConfirmation() {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>✅ Thank you for your order!</h2>
            <p>Your order has been placed successfully.</p>

            <div style={{
                marginTop: '2rem',
                background: '#f9f9f9',
                padding: '1rem',
                borderRadius: '10px',
                maxWidth: '400px',
                marginInline: 'auto'
            }}>
                <h3>🧾 Order Summary</h3>
                <p><strong>Items:</strong> 2</p>
                <p><strong>Subtotal:</strong> C$339.98</p>
                <p><strong>Tax (15%):</strong> C$51.00</p>
                <p><strong>Total:</strong> C$390.98</p>
                <p><strong>Est. Delivery:</strong> Sunday, Apr 27, 2025</p>
            </div>

            <Link to="/">
                <button style={{
                    marginTop: '2rem',
                    backgroundColor: '#03a9f4',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    cursor: 'pointer'
                }}>
                    🔙 Return to Home
                </button>
            </Link>
        </div>
    );
}

export default OrderConfirmation;
