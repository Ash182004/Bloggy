import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../lib/api';
import { useBlog } from '../store/context';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false); // Added isDeleting state to track button click
  const { state } = useBlog();
  const navigate = useNavigate();

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      setError('Failed to load blog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        setIsDeleting(true); // Disable the button once delete is in progress
        const token = state.token;
        if (!token) {
          alert('You must be logged in to delete this blog.');
          return;
        }

        const response = await API.delete(`/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Delete response:', response.data);
        navigate('/');
      } catch (err) {
        console.error('Delete error:', err.response?.data || err.message);
        alert(
          err.response?.data?.message || 'Failed to delete blog. Please try again.'
        );
      } finally {
        setIsDeleting(false); // Re-enable the button once the process is done
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!blog) return <p>oops! nothing is there</p>;

  const isAuthor = state.user?._id === blog?.author?._id;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '90%', // Increased width to 90%
          maxWidth: '1000px', // Increased max-width
          backgroundColor: '#FFF5EE',
          padding: '30px', // Increased padding for better spacing
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', // Slightly stronger shadow
          color: '#8b549e',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{blog.title}</h1> {/* Increased title size */}
        <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
          by {blog?.author?.name || 'Unknown'} -{' '}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {blog?.image?.url && (
          <img
            src={blog.image.url}
            alt={blog.title}
            style={{
              maxWidth: '100%',
              borderRadius: '8px',
              marginBottom: '20px', // Added margin for spacing
            }}
          />
        )}

        <p style={{ whiteSpace: 'pre-line', marginTop: '20px', fontSize: '1.1rem' }}>
          {blog.content}
        </p>

        {isAuthor && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px', // Increased margin for spacing
            }}
          >
            <button
              onClick={handleDelete}
              style={{
                backgroundColor: '#ff4d4f',
                color: 'white',
                border: 'none',
                padding: '12px 20px', // Increased padding for the button
                cursor: 'pointer',
                borderRadius: '4px',
                fontSize: '18px', // Increased font size for button text
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#e43f40')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#ff4d4f')}
              disabled={isDeleting} // Disable the button while deleting
            >
              {isDeleting ? 'Deleting...' : 'Delete Blog'}
            </button>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px', // Increased margin for spacing
          }}
        >
          <Link
            to="/"
            style={{
              color: '#8b549e',
              textDecoration: 'none',
              fontSize: '18px', // Increased font size for the link
              fontWeight: 'bold',
            }}
          >
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
