import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!address.trim()) newErrors.address = "Address is required";
        if (!name.trim()) newErrors.name = "Cardholder name is required";
        if (!/^\d{16}$/.test(cardNumber)) newErrors.cardNumber = "Card number must be 16 digits";
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) newErrors.expiry = "Expiry must be MM/YY";
        if (!/^\d{3,4}$/.test(cvv)) newErrors.cvv = "CVV must be 3 or 4 digits";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        navigate("/confirmation");
    };

    const handlePaypalClick = () => {
        alert("Redirecting to PayPal...");
    };

    const getInputStyle = (field) => ({
        width: "100%",
        padding: "0.5rem",
        marginBottom: "0.5rem",
        border: errors[field] ? "1px solid red" : "1px solid #ccc"
    });

    return (
        <div style={{ padding: "2rem" }}>
            <h2>🧾 Checkout</h2>
            <div style={{ marginBottom: "2rem" }}>
                <h3>Order Summary</h3>
                <p><strong>Items:</strong> 2</p>
                <p><strong>Subtotal:</strong> C$339.98</p>
                <p><strong>Tax (15%):</strong> C$51.00</p>
                <p><strong>Total:</strong> C$390.98</p>
                <p><strong>Est. Delivery:</strong> Tue Apr 22 2025</p>
            </div>
            <hr />
            <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
                <h3>Billing Address</h3>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your shipping address"
                    style={getInputStyle("address")}
                />
                {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}

                <h3>Payment Information</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name on card"
                    style={getInputStyle("name")}
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                <input
                    type="text"
                    inputMode="numeric"
                    maxLength="16"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="Card number"
                    style={getInputStyle("cardNumber")}
                />
                {errors.cardNumber && <p style={{ color: "red" }}>{errors.cardNumber}</p>}

                <div style={{ display: "flex", gap: "1rem" }}>
                    <input
                        type="text"
                        value={expiry}
                        onChange={(e) => {
                            let value = e.target.value.replace(/[^\d/]/g, '');
                            if (value.length === 2 && !value.includes('/')) {
                                value += '/';
                            }
                            if (value.length <= 5) setExpiry(value);
                        }}
                        placeholder="MM/YY"
                        style={{
                            flex: 1,
                            padding: "0.5rem",
                            borderColor: errors.expiry ? "red" : "#ccc",
                            borderWidth: "1px",
                            borderStyle: "solid"
                        }}
                    />
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength="4"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                        placeholder="CVV"
                        style={getInputStyle("cvv")}
                    />
                </div>
                {errors.expiry && <p style={{ color: "red" }}>{errors.expiry}</p>}
                {errors.cvv && <p style={{ color: "red" }}>{errors.cvv}</p>}

                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginTop: '1rem'
                }}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            padding: "0.5rem 1rem",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "1rem",
                            cursor: "pointer",
                            fontWeight: "bold",
                            flex: '1 1 180px',
                            minWidth: '140px'
                        }}
                    >
                        🛍️ Place Order
                    </button>
                    <button
                        type="button"
                        onClick={handlePaypalClick}
                        style={{
                            backgroundColor: '#ffc439',
                            color: '#111',
                            padding: "0.5rem 1rem",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "1rem",
                            cursor: "pointer",
                            fontWeight: "bold",
                            flex: '1 1 180px',
                            minWidth: '140px'
                        }}
                    >
                        🟡 Pay with PayPal
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CheckoutPage;
