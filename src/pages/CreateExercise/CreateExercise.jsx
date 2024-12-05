import React, { useState } from 'react';
import { API_URLS } from '../../api/api'; // Adjust the import path as necessary

const CreateExercise = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [points, setPoints] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URLS.createExercise, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, difficulty, points }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Exercise created successfully:', data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error creating exercise:', error);
    }
  };

  return (
    <div>
      <h2>Tạo Bài Tập</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Tiêu đề" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Mô tả" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Dễ</option>
          <option value="medium">Trung bình</option>
          <option value="hard">Khó</option>
        </select>
        <input type="number" placeholder="Điểm" value={points} onChange={(e) => setPoints(e.target.value)} required />
        <button type="submit">Tạo Bài Tập</button>
      </form>
    </div>
  );
};

export default CreateExercise; 