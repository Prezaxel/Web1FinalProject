import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const matchedUser = users.find(u => u.email === email && u.password === password);

        if (matchedUser) {
            localStorage.setItem('user', JSON.stringify(matchedUser));
            alert('Login successful');
            navigate('/account'); // or navigate('/');
        } else {
            alert('Invalid email or password');
        }
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <main
            style={{
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',       // ✅ Aligns to top
                minHeight: 'auto'               // ✅ Avoids extra stretch
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '360px',
                    height: 'auto'                // ✅ Let it grow with content
                }}
            >
                <h2
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.25rem'
                    }}
                >
                    <span role="img" aria-label="lock">🔒</span> Login
                </h2>
                <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    Please log in to proceed to checkout or access your account.
                </p>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            marginBottom: '1rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            marginBottom: '1.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            backgroundColor: '#2e7d32',
                            color: 'white',
                            padding: '0.6rem',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={goToRegister}
                        style={{
                            width: '100%',
                            backgroundColor: '#1976d2',
                            color: 'white',
                            padding: '0.6rem',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Create an Account
                    </button>
                </form>
            </div>
        </main>
    );
}

export default LoginPage;
