import { useEffect } from 'react'

function ToastMessage({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 2000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: '#28a745',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 9999
        }}>
            {message}
        </div>
    )
}

export default ToastMessage
