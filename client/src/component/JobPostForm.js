import React, { useState } from 'react';
import axios from 'axios';

const JobPostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/jobs', { title, description, location });
      alert('Job posted successfully');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" required />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobPostForm;
