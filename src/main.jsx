import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

import productsData from './data/products.json';

if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(productsData));
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
