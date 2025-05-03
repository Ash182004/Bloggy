import React, { useState } from 'react';
import API from '../lib/api';
import { useBlog } from '../store/context.jsx';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useBlog();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', { email, password });
      dispatch({
        type: 'LOGIN',
        payload: {
          user: { name: res.data.name, email: res.data.email, _id: res.data._id },
          token: res.data.token,
        },
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      className="w-full   h-screen flex items-center justify-center"
      // style={{
      //   backgroundImage: `
      //     linear-gradient(to bottom right, #e9d5ff, #c084fc),
      //     url("https://www.transparenttextures.com/patterns/sketchy.png")
      //   `,
      // }}
    >
      <div className="  w-full max-w-xl bg-[#FFF5EE] p-10 rounded-2xl shadow-2xl border border-purple-200">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Your Blog
        </h2>
        {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-lg text-lg bg-[#FFF5EE] focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
 />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-lg text-lg bg-[#FFF5EE] focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
    />
          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition text-lg"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-6 text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-purple-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
