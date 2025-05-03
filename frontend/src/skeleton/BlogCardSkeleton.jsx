import React from 'react';

const BlogCardSkeleton = () => {
  const skeletonStyle = {
    backgroundColor: '#e2e2e2',
    height: '20px',
    marginBottom: '10px',
    borderRadius: '4px',
  };

  return (
    <div style={{ border: '1px solid black', borderRadius: 6, marginBottom: 15, overflow: 'hidden' }}>
      <div style={{ width: '100%', height: 180, backgroundColor: '#e2e2e2' }} />
      <div style={{ padding: 15 }}>
        <div style={{ ...skeletonStyle, width: '80%' }} />
        <div style={{ ...skeletonStyle, width: '40%' }} />
        <div style={{ ...skeletonStyle, width: '90%' }} />
        <div style={{ ...skeletonStyle, width: '85%' }} />
        <div style={{ ...skeletonStyle, width: '95%' }} />
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
