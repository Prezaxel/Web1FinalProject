import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const categories = [
    'Accessories', 'Cables', 'Mice', 'Keyboards', 'Adapters',
    'Chargers', 'Storage', 'Cooling', 'GPU', 'CPU',
    'Case', 'Motherboard', 'RAM', 'Display', 'Power Supply'
];

function Sidebar() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsOpen(false); // close menu on route change
    }, [location]);

    return (
        <aside style={{
            background: '#f4f4f4',
            padding: '1rem',
            borderRight: '1px solid #ccc',
            width: isMobile ? '100%' : '220px',
            boxShadow: isMobile ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
        }}>
            {isMobile ? (
                <>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            marginBottom: '1rem',
                            background: '#1e1e22',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        📁 Categories {isOpen ? '▲' : '▼'}
                    </button>
                    {isOpen && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {categories.map((cat) => (
                                <Link
                                    key={cat}
                                    to={`/category/${cat}`}
                                    style={{
                                        padding: '0.5rem',
                                        background: '#fff',
                                        borderRadius: '4px',
                                        textDecoration: 'none',
                                        color: '#333',
                                        border: '1px solid #ddd'
                                    }}
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>📁 Categories</h3>
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            to={`/category/${cat}`}
                            style={{
                                padding: '0.5rem',
                                background: '#fff',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                color: '#333',
                                border: '1px solid #ddd'
                            }}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            )}
        </aside>
    );
}

export default Sidebar;
