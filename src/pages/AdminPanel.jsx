import React, { useState, useEffect } from 'react';
import UsersTab from '../components/UsersTab';
import productsData from '../data/products.json';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState('Inventory');
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editingProductData, setEditingProductData] = useState({});
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', image: '', description: '' });
    const [imageMode, setImageMode] = useState('url');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('products');
        setProducts(stored ? JSON.parse(stored) : productsData);
    }, []);

    const tabBtn = (label) => ({
        backgroundColor: activeTab === label ? '#222' : '#f2f2f2',
        color: activeTab === label ? 'white' : '#333',
        border: 'none',
        padding: '0.6rem 1.2rem',
        marginRight: '0.5rem',
        borderRadius: '6px',
        fontWeight: 'bold',
        cursor: 'pointer'
    });

    const inputStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        padding: '0.5rem',
        width: '100%'
    };

    const handleDelete = (id) => {
        const updated = products.filter(product => product.id !== id);
        setProducts(updated);
        localStorage.setItem('products', JSON.stringify(updated));
    };

    const handleEdit = (product) => {
        setEditingProductId(product.id);
        setEditingProductData({ ...product });
    };

    const saveEdit = () => {
        if (!editingProductData.name || !editingProductData.price || !editingProductData.category || !editingProductData.image || !editingProductData.description) {
            setFeedback('All fields are required.');
            return;
        }
        const updated = products.map(p => p.id === editingProductId ? editingProductData : p);
        setProducts(updated);
        localStorage.setItem('products', JSON.stringify(updated));
        setEditingProductId(null);
        setEditingProductData({});
        setFeedback('Product updated successfully.');
        setTimeout(() => setFeedback(''), 2000);
    };

    const cancelEdit = () => {
        setEditingProductId(null);
        setEditingProductData({});
    };

    const handleAdd = () => {
        if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.image || !newProduct.description) {
            setFeedback('All fields are required.');
            return;
        }
        const id = Date.now();
        const updated = [...products, { ...newProduct, id }];
        setProducts(updated);
        localStorage.setItem('products', JSON.stringify(updated));
        setNewProduct({ name: '', price: '', category: '', image: '', description: '' });
        setFeedback('New product added successfully.');
        setTimeout(() => setFeedback(''), 2000);
    };

    const renderInventoryTab = () => (
        <div>
            <h3 style={{ marginBottom: '1rem' }}>🧾 Product Inventory</h3>

            {/* Add New Product */}
            <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                <h4>Add New Product</h4>
                {['name', 'price', 'category', 'description'].map((field) => (
                    <div key={field}>
                        <input
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            type={field === 'price' ? 'number' : 'text'}
                            value={newProduct[field]}
                            onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
                            style={{
                                ...inputStyle,
                                border: newProduct[field] === '' ? '1px solid red' : '1px solid #ccc',
                                backgroundColor: newProduct[field] === '' ? '#fff5f5' : 'white'
                            }}
                        />
                        {newProduct[field] === '' && <small style={{ color: 'red' }}>{field} is required</small>}
                    </div>
                ))}
                <div style={{ marginBottom: '0.5rem' }}>
                    <label>
                        <input type="radio" checked={imageMode === 'url'} onChange={() => setImageMode('url')} /> Use Image URL
                    </label>{' '}
                    <label>
                        <input type="radio" checked={imageMode === 'upload'} onChange={() => setImageMode('upload')} /> Upload Image File
                    </label>
                </div>
                {imageMode === 'url' ? (
                    <input
                        placeholder="Image URL"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        style={inputStyle}
                    />
                ) : (
                    <input
                        type="file"
                        onChange={(e) => setNewProduct({ ...newProduct, image: URL.createObjectURL(e.target.files[0]) })}
                        style={inputStyle}
                    />
                )}
                <button onClick={handleAdd} style={{ backgroundColor: '#4caf50', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}>
                    ➕ Add Product
                </button>
                {feedback && <div style={{ marginTop: '1rem', color: feedback.includes('required') ? 'red' : 'green' }}>{feedback}</div>}
            </div>

            {/* Product List */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <React.Fragment key={product.id}>
                        <tr style={{ borderBottom: '1px solid #ccc' }}>
                            <td><img src={product.image} alt={product.name} style={{ width: '60px' }} /></td>
                            <td>{product.name}</td>
                            <td>C${product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                <button onClick={() => handleEdit(product)} style={{ backgroundColor: '#ffa726', marginRight: '0.5rem', border: 'none', padding: '0.3rem 0.6rem', color: 'white' }}>✏️ Edit</button>
                                <button onClick={() => handleDelete(product.id)} style={{ backgroundColor: '#ef5350', border: 'none', padding: '0.3rem 0.6rem', color: 'white' }}>🗑️ Delete</button>
                            </td>
                        </tr>
                        {editingProductId === product.id && (
                            <tr>
                                <td colSpan="5">
                                    <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f2f2f2', borderRadius: '10px' }}>
                                        <h4>Edit Product</h4>
                                        {['name', 'price', 'category', 'description', 'image'].map((field) => (
                                            <div key={field}>
                                                <input
                                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                    type={field === 'price' ? 'number' : 'text'}
                                                    value={editingProductData[field]}
                                                    onChange={(e) => setEditingProductData({ ...editingProductData, [field]: e.target.value })}
                                                    style={{
                                                        ...inputStyle,
                                                        border: editingProductData[field] === '' ? '1px solid red' : '1px solid #ccc',
                                                        backgroundColor: editingProductData[field] === '' ? '#fff5f5' : 'white'
                                                    }}
                                                />
                                                {editingProductData[field] === '' && <small style={{ color: 'red' }}>{field} is required</small>}
                                            </div>
                                        ))}
                                        <button onClick={saveEdit} style={{ backgroundColor: '#4caf50', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}>💾 Save Changes</button>
                                        <button onClick={cancelEdit} style={{ marginLeft: '0.5rem' }}>Cancel</button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <main style={{ padding: '2rem' }}>
            <h2>🛠️ Admin Panel</h2>
            <div style={{ marginBottom: '1rem' }}>
                <button onClick={() => setActiveTab('Users')} style={tabBtn('Users')}>Users</button>
                <button onClick={() => setActiveTab('Inventory')} style={tabBtn('Inventory')}>Inventory</button>
            </div>
            {activeTab === 'Users' ? <UsersTab /> : renderInventoryTab()}
        </main>
    );
}

export default AdminPanel;
