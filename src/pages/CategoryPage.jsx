import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CategoryPage({ showToast }) {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const stored = localStorage.getItem('products');
        setProducts(stored ? JSON.parse(stored) : []);
        setLoading(false);
    }, []);

    const filteredProducts = products.filter(
        (product) => product.category?.toLowerCase() === categoryName?.toLowerCase()
    );

    const handleAdd = (product) => {
        addToCart(product);
        showToast && showToast('✅ Added to Cart');
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>📁 {categoryName} Products</h2>
            {loading ? (
                <p>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
                <p>No products found in this category.</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                padding: '1rem',
                                width: '200px',
                                background: 'white'
                            }}
                        >
                            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
                            <h3 style={{ fontSize: '1rem' }}>{product.name}</h3>
                            <p>C${parseFloat(product.price).toFixed(2)}</p>
                            <button
                                onClick={() => handleAdd(product)}
                                style={{
                                    background: '#2196f3',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    cursor: 'pointer',
                                    borderRadius: '4px'
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryPage;
