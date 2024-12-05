import React, { useState, useEffect } from "react";
import "./ListDocument.css";
import { Link } from "react-router-dom";
import { API_URLS } from '../../api/api';

const ListDocument = () => {
  const [activeLesson, setActiveLesson] = useState(null);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState({});
  const [documents, setDocuments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };

        // Fetch courses
        const coursesResponse = await fetch('http://localhost:5000/api/courses', requestOptions);
        if (!coursesResponse.ok) {
          throw new Error('Failed to fetch courses');
        }
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        // Fetch lessons and documents for each course
        for (const course of coursesData) {
          try {
            const lessonsResponse = await fetch(
              `http://localhost:5000/api/courses/${course._id}/lessons`,
              requestOptions
            );
            
            if (lessonsResponse.ok) {
              const lessonsData = await lessonsResponse.json();
              setLessons(prev => ({
                ...prev,
                [course._id]: lessonsData
              }));

              // Documents are now included with each lesson
              const documentsMap = {};
              lessonsData.forEach(lesson => {
                if (lesson.documents) {
                  documentsMap[lesson._id] = lesson.documents;
                }
              });
              
              setDocuments(prev => ({
                ...prev,
                ...documentsMap
              }));
            }
          } catch (error) {
            console.error(`Error fetching data for course ${course._id}:`, error);
          }
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, []);

  const toggleLesson = (lessonId) => {
    setActiveLesson(activeLesson === lessonId ? null : lessonId);
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="logo">
          <span>Newlearning</span>
        </div>
        <ul>
          <li>
            <Link to="/admin-home">
              <i className="icon">📊</i> Bảng điều khiển
            </Link>
          </li>
          <li>
            <Link to="/admin">
              <i className="icon">📚</i> Khóa học
            </Link>
          </li>
          <li>
            <Link to="/list-homework">
              <i className="icon">📝</i> Bài tập
            </Link>
          </li>
          <li>
            <Link to="/view-progress">
              <i className="icon">🚀</i> Đánh giá
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="course-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="course">
              <h2>{course.title}</h2>
              <div className="lessons-container">
                {lessons[course._id]?.map((lesson) => (
                  <div key={lesson._id} className="lesson-item">
                    <div className="lesson-header">
                      <button
                        onClick={() => toggleLesson(lesson._id)}
                        className={`lesson-button ${activeLesson === lesson._id ? 'active' : ''}`}
                      >
                        {lesson.title}
                      </button>
                    </div>
                    
                    {activeLesson === lesson._id && (
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
                                  <a
                                    href={`${API_URLS.getDocumentById(doc._id)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="document-link"
                                  >
                                    <i className="icon">📄</i> {doc.filename}
                                  </a>
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
              </div>
              
              <div className="course-actions">
                <Link 
                  to={`/add-lesson?courseId=${course._id}`}
                  className="add-button"
                >
                  Thêm Bài Học
                </Link>
                <Link 
                  to={`/add-document?courseId=${course._id}`}
                  className="add-button"
                >
                  Thêm Tài Liệu
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Không có khóa học nào để hiển thị.</p>
        )}
      </div>
    </div>
  );
};

export default ListDocument;
