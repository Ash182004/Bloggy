import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../store/context';

const Navbar = () => {
  const { state, dispatch } = useBlog();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px 15px', backgroundColor: '#FFF5EE', color: 'black', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <Link
  to="/"
  style={{
    color: '#8b549e',
    textDecoration: 'none',
    fontFamily: '"Pacifico", cursive', // Fixed property
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '24px',
    letterSpacing: '1px',
  }}
>
  Your Blog
</Link>
      <div>
        {state.user ? (
          <>
            <Link
              to="/create"
              style={{
                marginRight: 15,
                backgroundColor: '#8b549e', // Purple button background
                color: 'white',
                padding: '10px 15px',
                borderRadius: '4px',
                fontSize: '16px',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
              }}
            >
              Create 
            </Link>
            <button
              onClick={logout}
              style={{
                backgroundColor: '#d1a7f7', // Faded purple color for 'Logout'
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                cursor: 'pointer',
                borderRadius: '4px',
                fontSize: '16px',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#b887d9'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#d1a7f7'}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 15, color: '#8b549e', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
            <Link to="/register" style={{ color: '#8b549e', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
