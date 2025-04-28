import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AccountPage() {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const { logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <main style={{ padding: '2rem' }}>
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    maxWidth: '400px',
                    margin: '2rem auto',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <h2>🔐 Please log in</h2>
                    <p>To view your account info, please log in.</p>
                    <Link to="/login">
                        <button style={{
                            width: '100%',
                            backgroundColor: '#2e7d32',
                            color: 'white',
                            padding: '0.75rem',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '1rem'
                        }}>Login</button>
                    </Link>
                    <Link to="/register">
                        <button style={{
                            width: '100%',
                            backgroundColor: '#1976d2',
                            color: 'white',
                            padding: '0.75rem',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '0.5rem'
                        }}>Create an Account</button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main style={{ padding: '2rem' }}>
            <div style={{
                background: 'white',
                padding: '2rem',
                maxWidth: '400px',
                margin: '2rem auto',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <h2>👤 Account Info</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <div style={{ marginTop: '1rem' }}>
                    <img
                        src={user.avatar || '/default-avatar.png'}
                        alt="Profile"
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
                <button
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    style={{
                        marginTop: '1.5rem',
                        backgroundColor: '#d32f2f',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>
        </main>
    );
}

export default AccountPage;
