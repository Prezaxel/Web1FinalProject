import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductPage from './pages/ProductPage';
import Home from './pages/Home';
import ToastMessage from './components/ToastMessage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import AdminPanel from './pages/AdminPanel';
import { useAuth } from './context/AuthContext';
import NotFound from "./pages/NotFound.jsx";
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
    const [toast, setToast] = useState(null);
    const { isAuthenticated } = useAuth();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{
                display: 'flex',
                flex: 1,
                flexDirection: isMobile ? 'column' : 'row'
            }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={<Home showToast={showToast} />} />
                        <Route path="/cart" element={<CartPage showToast={showToast} />} />
                        <Route path="/checkout" element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />} />
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/category/:categoryName" element={<CategoryPage showToast={showToast} />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/confirmation" element={<OrderConfirmation />} />
                    </Routes>
                </div>
            </div>
            {toast && (
                <ToastMessage message={toast} onClose={() => setToast(null)} />
            )}
            <Footer />
        </div>
    );
}

export default App;
