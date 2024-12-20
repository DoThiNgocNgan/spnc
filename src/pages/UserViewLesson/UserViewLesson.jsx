import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_URLS } from '../../api/api';
import './UserViewLesson.css';

const UserViewLesson = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const courseId = query.get('courseId');
  const courseTitle = query.get('courseTitle');
  
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [documents, setDocuments] = useState({});

  useEffect(() => {
    const fetchLessonsAndDocuments = async () => {
      if (!courseId) return;

      try {
        const response = await fetch(`${API_URLS.getLessonsByCourse(courseId)}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch lessons');
        }

        const lessonsData = await response.json();
        setLessons(lessonsData);

        // Documents are now included with each lesson from the backend
        const documentsMap = {};
        lessonsData.forEach(lesson => {
          if (lesson.documents) {
            documentsMap[lesson._id] = lesson.documents;
          }
        });
        setDocuments(documentsMap);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessonsAndDocuments();
  }, [courseId]);

  const handleViewDocument = (documentId) => {
    // Mở document trong tab mới
    window.open(`${API_URLS.getDocumentById(documentId)}`, '_blank');
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Newlearning</h2>
        <nav>
          <ul>
            <li><Link to="/user-dashboard">🏠 Bảng điều khiển</Link></li>
            <li><Link to="/user-course">📚 Khóa học</Link></li>
            <li><Link to="/user-exercise">📝 Bài tập</Link></li>
            <li><Link to="/user-messages">💬 Tin nhắn</Link></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <a href="#settings">⚙️ Cài đặt</a>
          <a href="#account">👤 Tài khoản</a>
        </div>
      </aside>

      <main className="main-content">
        <header>
          <h1>{courseTitle}</h1>
        </header>

        <section className="lessons-list">
          {lessons.map((lesson) => (
            <div 
              key={lesson._id} 
              className={`lesson-item ${selectedLesson?._id === lesson._id ? 'selected' : ''}`}
            >
              <div className="lesson-header">
                <h3>{lesson.title}</h3>
                <button 
                  className="view-button"
                  onClick={() => setSelectedLesson(selectedLesson?._id === lesson._id ? null : lesson)}
                >
                  {selectedLesson?._id === lesson._id ? 'Ẩn bài học' : 'Xem bài học'}
                </button>
              </div>
              
              {selectedLesson?._id === lesson._id && (
                <div className="lesson-content">
                  <div className="lesson-details">
                    <h4>Nội dung bài học:</h4>
                    <p>{lesson.content}</p>
                  </div>
                  
                  <div className="documents-section">
                    <h4>Tài liệu bài học:</h4>
                    {documents[lesson._id]?.length > 0 ? (
                      <ul className="documents-list">
                        {documents[lesson._id].map((doc) => (
                          <li key={doc._id} className="document-item">
                            <button
                              className="document-button"
                              onClick={() => handleViewDocument(doc._id)}
                            >
                              <i className="icon">📄</i>
                              <span className="document-name">{doc.filename}</span>
                              <span className="view-text">Xem</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Chưa có tài liệu cho bài học này</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default UserViewLesson;
