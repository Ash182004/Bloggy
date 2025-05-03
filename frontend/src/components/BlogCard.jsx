import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 6, marginBottom: 15, overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      {blog.image && blog.image.url && (
        <img src={blog.image.url} alt={blog.title || 'Blog Image'} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
      )}
      <div style={{ padding: 15 }}>
        <Link to={`/blogs/${blog._id}`} style={{ fontSize: 18, fontWeight: 'bold', color: '#333', textDecoration: 'none' }}>
          {blog.title}
        </Link>
        <p style={{ color: '#666', margin: '8px 0' }}>
          by {blog.author.name} - {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <p style={{
          color: '#555',
          fontSize: 14,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {blog.content}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
