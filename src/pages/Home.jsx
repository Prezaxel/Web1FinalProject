import React, { useMemo, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function Home({ showToast }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('products');
        setProducts(stored ? JSON.parse(stored) : []);
        setLoading(false);
    }, []);

    const shuffledProducts = useMemo(() => shuffleArray(products).slice(0, 10), [products]);

    return (
        <div style={{ display: 'flex', flex: 1 }}>
            <main style={{ flex: 1, padding: '1rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>
                    🔥 Most Sold Items
                </h2>
                {loading ? (
                    <p>Loading products...</p>
                ) : shuffledProducts.length === 0 ? (
                    <p>No products available at the moment.</p>
                ) : (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '1rem',
                        }}
                    >
                        {shuffledProducts.map((product) => (
                            <ProductCard key={product.id} product={product} showToast={showToast} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;
