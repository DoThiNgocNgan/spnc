import React, { useState } from 'react';
import { API_URLS } from '../../api/api'; // Adjust the import path as necessary

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [lessonId, setLessonId] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('lessonId', lessonId);

    try {
      const response = await fetch(API_URLS.uploadDocument, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Document uploaded successfully:', data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <div>
      <h2>Tải lên tài liệu</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="ID Bài Học" value={lessonId} onChange={(e) => setLessonId(e.target.value)} required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Tải lên</button>
      </form>
    </div>
  );
};

export default UploadDocument; 