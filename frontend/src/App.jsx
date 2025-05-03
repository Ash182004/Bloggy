import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import { BlogProvider, useBlog } from './store/context';

function PrivateRoute({ children }) {
  const { state } = useBlog();
  return state.user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div style={{ maxWidth: 600, margin: 'auto', padding: 10 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </div>
    </>
  );
}

const App = () => {
  return (
    <BlogProvider>
      <Router>
        <AppContent />
      </Router>
    </BlogProvider>
  );
};

export default App;
