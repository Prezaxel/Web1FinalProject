import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main style={{
            padding: '4rem',
            textAlign: 'center',
            color: '#444'
        }}>
            <h1 style={{ fontSize: '4rem' }}>404</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Oops! The page you’re looking for doesn’t exist.</p>
            <Link to="/" style={{
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#1976d2',
                color: 'white',
                borderRadius: '6px'
            }}>
                🔙 Go to Home
            </Link>
        </main>
    );
}

export default NotFound;
