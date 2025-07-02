import { useState } from 'react';
import API from '../api/apiclient';

const OrderCard = ({ order }) => {
  const [actionMessage, setActionMessage] = useState('');
  const [status, setStatus] = useState(order.status);
  const userId = localStorage.getItem('userId');

  const handleAction = async (type) => {
    try {
      const { data } = await API.post(`/orders/${order._id}/${type}`, { userId });
      setActionMessage(data.message);

      if (type === 'escalate') setStatus('Escalation requested');
      if (type === 'cancel') setStatus('Cancellation requested');
      if (type === 'return') setStatus('Return requested + reverse pickup initiated');
    } catch (err) {
      setActionMessage('Action failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-blue-700">{order.productName}</h2>
      <p>Status: <span className="font-medium">{status}</span></p>
      <p>Price: ₹{order.price}</p>
      <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
      <p>Expected Delivery: {order.expectedDelivery || 'N/A'}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => handleAction('escalate')} className="bg-red-500 text-white px-3 py-1 rounded">Escalate</button>
        <button onClick={() => handleAction('cancel')} className="bg-yellow-500 text-white px-3 py-1 rounded">Cancel</button>
        <button onClick={() => handleAction('return')} className="bg-green-500 text-white px-3 py-1 rounded">Return</button>
      </div>

      {actionMessage && <p className="mt-3 text-sm text-purple-700 font-medium">{actionMessage}</p>}
    </div>
  );
};

export default OrderCard;
