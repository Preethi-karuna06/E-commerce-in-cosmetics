import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3001/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem('token');
    await axios.put(
      `http://localhost:3001/api/admin/orders/${id}/status`,
      { orderStatus: status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setOrders((prev) =>
      prev.map((order) => (order._id === id ? { ...order, orderStatus: status } : order))
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4">
          <p>User: {order.user?.name || 'N/A'}</p>
          <p>Address: {order.address}</p>
          <p>Phone: {order.phoneNumber}</p>
          <p>Payment: {order.paymentMethod}</p>
          <p>Status: 
            <select value={order.orderStatus} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
              <option value="Processing">Processing</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </p>
          <div className="mt-2">
            {order.products.map((p, i) => (
              <div key={i} className="text-sm">{p.product.title} x {p.quantity}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
