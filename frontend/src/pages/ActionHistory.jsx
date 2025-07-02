import { useEffect, useState } from 'react';
import API from '../api/apiclient';

const ActionHistory = () => {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await API.get(`/users/${userId}/actions`);
        setHistory(data);
      } catch (err) {
        console.error('Error fetching history', err);
      }
    };
    fetchHistory();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-bold mb-4 text-blue-700">Your Action History</h1>
      {history.length === 0 ? (
        <p className="text-gray-500">No actions recorded.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((action, index) => (
            <li key={index} className="bg-white p-3 rounded shadow">
              <p><strong>Action:</strong> {action.type}</p>
              <p><strong>Order ID:</strong> {action.orderId}</p>
              <p><strong>Date:</strong> {new Date(action.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActionHistory;
