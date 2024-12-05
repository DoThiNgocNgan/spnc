import React, { useState, useEffect } from 'react';
import { API_URLS } from '../../api/api'; // Adjust the import path as necessary

const Lessons = ({ courseId }) => {
  const [lessons, setLessons] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchLessonsAndDocuments = async () => {
      try {
        const response = await fetch(`${API_URLS.lessons}/documents/${courseId}`);
        const data = await response.json();
        setLessons(data.lessons);
        setDocuments(data.documents);
      } catch (error) {
        console.error('Error fetching lessons and documents:', error);
      }
    };

    fetchLessonsAndDocuments();
  }, [courseId]);

  return (
    <div>
      <h2>Bài học trong khóa học</h2>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson._id}>
            {lesson.title}
            <ul>
              {documents
                .filter(doc => doc.lesson_id === lesson._id)
                .map(doc => (
                  <li key={doc._id}>
                    <a href={`/api/documents/${doc._id}`} target="_blank" rel="noopener noreferrer">
                      {doc.filename}
                    </a>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lessons; 