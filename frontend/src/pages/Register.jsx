import React, { useState } from 'react';
import API from '../lib/api';
import { useBlog } from '../store/context';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const { dispatch } = useBlog();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/register', { name, email, password });
      dispatch({ type: 'LOGIN', payload: { user: { name: res.data.name, email: res.data.email, _id: res.data._id }, token: res.data.token } });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
       
      }}
    >
      <div
        style={{
          width: '500px',
          padding: '30px',
          borderRadius: '8px',
          backgroundColor: '#FFF5EE', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Register
        </h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: '12px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '12px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '12px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button
             type="submit"
            className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition text-lg"
          >
            Register
          </button>
        </form>
        <p style={{ marginTop: 15, textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: '#8b549e' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
