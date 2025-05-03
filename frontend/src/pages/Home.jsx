import React, { useEffect, useState } from 'react';
import API from '../lib/api';
import BlogCard from '../components/BlogCard';
import BlogCardSkeleton from '../skeleton/BlogCardSkeleton';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await API.get('/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0px',
      }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#f8f8f8', // Changed to off-white color
          marginBottom: '20px',
        }}
      >
        here you go..
      </h1>

      {loading
        ? [1, 2, 3, 4].map((n) => (
            <div
              key={n}
              style={{
                width: '90%', // Increased width to 90%
                maxWidth: '1200px', // Increased max width for larger display
                backgroundColor: 'white', // Removed outer background color
                padding: '20px',
                // marginBottom: '20px',
                // borderRadius: '8px',
                // Removed boxShadow property
              }}
            >
              <BlogCardSkeleton />
            </div>
          ))
        : blogs.length === 0
        ? (
            <p
              style={{
                fontSize: '18px',
                color: 'white',
                marginTop: '30px',
              }}
            >
              No blogs found.
            </p>
          )
        : blogs.map((blog) => (
            <div
              key={blog._id}
              style={{
                width: '100%', // Increased width to 90%
                maxWidth: '1200px', // Increased max width for larger display
                backgroundColor: '#FFF5EE', // Removed outer background color
                // padding: '20px',
                marginBottom: '20px',
                borderRadius: '8px',
                // Removed boxShadow property
              }}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
    </div>
  );
};

export default Home;
