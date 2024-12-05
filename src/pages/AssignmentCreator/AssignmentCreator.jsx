import React, { useState } from 'react';
import './AssignmentCreator.css';

function AssignmentCreator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(API_URLS.createExercise, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lesson_id: lessonId,
                user_id: userId, // Get user ID from context or local storage
                code,
                title,
                difficulty,
                points,
                type,
            }),
        });
        // ... existing code ...
    } catch (error) {
        console.error('Error creating exercise:', error);
    }
  };

  return (
    <div className="assignment-creator">
      <h2>Tạo Bài Tập Mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Tiêu đề:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Mô tả:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Ngày hết hạn:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Tạo Bài Tập</button>
      </form>
    </div>
  );
}

export default AssignmentCreator;

