import React, { useState } from 'react';
import API from '../lib/api';
import { useBlog } from '../store/context';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Added isSubmitting state to track the button click
  const { state } = useBlog();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageData(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true); // Disable the button once the form is submitted
    try {
      await API.post(
        '/blogs',
        {
          title,
          content,
          image: imageData,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setIsSubmitting(false); // Re-enable the button once the process is done
    }
  };

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
          width: '90%',
          maxWidth: '1000px',
          backgroundColor: '#FFF5EE',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          color: '#8b549e',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
          Create a Blog
        </h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px', // Increased gap between form elements
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: '12px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          />
          <textarea
            placeholder="Content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            style={{
              padding: '12px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          />
          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition text-lg"
            disabled={isSubmitting} // Disable the button while submitting
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
