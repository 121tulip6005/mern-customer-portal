import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/apiclient';

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await API.post('/auth/login', {
        emailOrPhone,
        password,
        orderId,
      });
      localStorage.setItem('userId', data.userId);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed: ' + err.response.data.message);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Customer Login</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email or Phone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Order ID (optional)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
