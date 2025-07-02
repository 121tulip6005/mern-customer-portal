import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/apiClient';
import OrderCard from '../components/OrderCard';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    API.get(`/orders/${userId}`).then((res) => setOrders(res.data));
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <h2 className="text-3xl font-bold">Your Orders</h2>
        <Link
          to="/history"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Action History
        </Link>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          orders.map((order) => <OrderCard key={order._id} order={order} />)
        )}
      </div>
    </div>
  );
};

export default Dashboard;
