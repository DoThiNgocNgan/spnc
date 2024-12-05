import React, { useState } from 'react';
import { API_URLS } from '../../api/api'; // Adjust the import path as necessary

const SubmitExercise = ({ exerciseId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URLS.submitExercise, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exerciseId, content }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Exercise submitted successfully:', data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error submitting exercise:', error);
    }
  };

  return (
    <div>
      <h2>Nộp Bài Tập</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Nội dung bài làm" required />
        <button type="submit">Nộp bài</button>
      </form>
    </div>
  );
};

export default SubmitExercise; 