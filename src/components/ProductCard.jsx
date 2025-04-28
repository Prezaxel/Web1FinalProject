import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function ProductCard({ product, showToast }) {
    const { addToCart } = useCart();

    const handleAdd = () => {
        addToCart(product);
        showToast && showToast('✅ Added to Cart');
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', background: '#fff', textAlign: 'center' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
            <h4>{product.name}</h4>
            <p>C${!isNaN(product.price) ? Number(product.price).toFixed(2) : '0.00'}</p>
            <button
                onClick={handleAdd}
                style={{ padding: '0.4rem 0.8rem', backgroundColor: '#61dafb', border: 'none', cursor: 'pointer', margin: '0.3rem' }}
            >
                Add to Cart
            </button>
            <Link to={`/product/${product.id}`}>
                <button style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ccc', border: 'none', cursor: 'pointer' }}>
                    More Info
                </button>
            </Link>
        </div>
    );
}

export default ProductCard;
