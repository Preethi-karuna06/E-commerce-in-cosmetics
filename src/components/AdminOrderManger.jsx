import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrdersp = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3001/api/orders/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem('token');
    await axios.put(
      `http://localhost:3001/api/orders/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, orderStatus: status } : order
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Orders (Admin View)</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded shadow text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">User ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Products</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Payment</th>
              <th className="px-4 py-2 border">Payment Status</th>
              <th className="px-4 py-2 border">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{order.user?._id || 'N/A'}</td>
                <td className="border px-4 py-2">
                  {order.user?.firstName} {order.user?.lastName}
                </td>
                <td className="border px-4 py-2">
                  {order.shippingAddress?.phoneNumber || 'N/A'}
                </td>
                <td className="border px-4 py-2">
                  {order.shippingAddress?.address}, {order.shippingAddress?.city},{' '}
                  {order.shippingAddress?.pincode}
                </td>
                <td className="border px-4 py-2">
                  {order.products.map((p, i) => (
                    <div key={i}>
                      {p.product?.title} × {p.quantity}
                    </div>
                  ))}
                </td>
                <td className="border px-4 py-2">₹{order.totalAmount}</td>
                <td className="border px-4 py-2">{order.paymentMethod}</td>
                <td className="border px-4 py-2">{order.paymentStatus}</td>
                <td className="border px-4 py-2">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-gray-500 mt-4">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersp;
