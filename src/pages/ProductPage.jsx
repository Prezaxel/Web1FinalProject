import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';

function ProductPage() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const found = products.find(p => p.id.toString() === id);
        setProduct(found);
    }, [id]);

    if (!product) return <p style={{ padding: '2rem' }}>Product not found or still loading...</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} style={{ maxWidth: '300px' }} />
            <p><strong>Price:</strong> C${parseFloat(product.price).toFixed(2)}</p>
            <p><strong>Description:</strong> {product.description || 'No additional info available.'}</p>
            <button
                onClick={() => addToCart(product)}
                style={{ marginTop: '1rem', background: '#61dafb', padding: '0.6rem 1rem', border: 'none' }}
            >
                Add to Cart
            </button>
        </div>
    );
}

export default ProductPage;
