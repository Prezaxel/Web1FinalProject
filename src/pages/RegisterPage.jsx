import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        const alreadyExists = existingUsers.some(user => user.email === email);
        if (alreadyExists) {
            alert('This email is already registered.');
            return;
        }

        const newUser = {
            name,
            email,
            password,
            avatar: '',
            isAdmin: email === 'admin@techstore.com' // <- ONLY if specific email
        };

        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        alert('Account created! You can now log in.');
        navigate('/login');
    };


    return (
        <div className="register-container">
            <div className="register-card">
                <h2>🧑‍💻 Create Account</h2>
                <p>Fill in your information to register a new account.</p>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label className="upload-label">
                        Upload Profile Picture (optional):
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                        />
                    </label>

                    <button type="submit" className="register-btn">Register</button>
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate('/login')}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
