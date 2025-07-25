// /client/src/pages/Checkout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    firstName: '',
    phoneNumber: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'COD'
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:3001/api/orders',
        {
          products: cartItems.map((item) => ({ product: item._id, quantity: 1 })),
          address: `${form.address}, ${form.city}, ${form.pincode}`,
          phoneNumber: form.phoneNumber,
          paymentMethod: form.paymentMethod
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Order placed!');
      localStorage.removeItem('cart');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Order failed');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <div className="space-y-2">
        <input name="firstName" placeholder="First Name" className="border p-2 w-full" onChange={handleChange} />
        <input name="phoneNumber" placeholder="Phone Number" className="border p-2 w-full" onChange={handleChange} />
        <input name="address" placeholder="Address" className="border p-2 w-full" onChange={handleChange} />
        <input name="city" placeholder="City" className="border p-2 w-full" onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" className="border p-2 w-full" onChange={handleChange} />
        <select name="paymentMethod" className="border p-2 w-full" onChange={handleChange}>
          <option value="COD">Cash on Delivery</option>
          <option value="Online">Online Payment</option>
        </select>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Cart Summary</h3>
        {cartItems.map((item, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>{item.title}</span>
            <span>₹{item.price}</span>
          </div>
        ))}
        <div className="text-right font-bold mt-2">Total: ₹{total}</div>
        <button onClick={handleOrder} className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Confirm Order</button>
      </div>
    </div>
  );
};

export default Checkout;