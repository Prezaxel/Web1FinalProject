import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const isAdmin = user?.email === 'admin@techstore.com';

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    const handleInput = (e) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);
        const matches = products.filter(product =>
            product.name.toLowerCase().includes(value)
        );
        setFiltered(value ? matches : []);
    };

    const handleSelect = (id) => {
        setQuery('');
        setFiltered([]);
        navigate(`/product/${id}`);
    };

    return (
        <header style={{
            background: '#1e1e22',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            flexWrap: 'wrap'
        }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    Tech Store
                </Link>
            </div>

            <div style={{
                position: 'relative',
                flexGrow: 1,
                maxWidth: '400px',
                margin: '0 auto'
            }}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInput}
                    placeholder="Search..."
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                {filtered.length > 0 && (
                    <ul style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        color: 'black',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        border: '1px solid #ccc',
                        zIndex: 10
                    }}>
                        {filtered.map(product => (
                            <li
                                key={product.id}
                                onClick={() => handleSelect(product.id)}
                                style={{
                                    padding: '0.5rem',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #eee'
                                }}
                            >
                                {product.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                {user?.isAdmin && (
                    <Link to="/admin">
                        <button style={{
                            background: '#ffa726',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            borderRadius: '4px'
                        }}>
                            🛠 Admin Panel
                        </button>
                    </Link>
                )}

                <Link to="/account">
                    <button style={{
                        background: '#eee',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '50%',
                        cursor: 'pointer'
                    }}>
                        👤
                    </button>
                </Link>

                <Link to="/cart">
                    <button style={{
                        background: '#61dafb',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}>
                        🛒 Cart
                    </button>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;
