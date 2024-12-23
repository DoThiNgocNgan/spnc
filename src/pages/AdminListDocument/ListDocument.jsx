import React, { useState, useEffect } from "react";
import "./ListDocument.css";
import { Link } from "react-router-dom";
import { API_URLS } from '../../api/api';

const ListDocument = () => {
  const [activeLesson, setActiveLesson] = useState(null);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState({});
  const [documents, setDocuments] = useState({});
  const [editingLesson, setEditingLesson] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses
        const coursesResponse = await fetch(API_URLS.getCourses, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!coursesResponse.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        // Fetch lessons và documents cho mỗi course
        for (const course of coursesData) {
          const lessonsResponse = await fetch(
            API_URLS.getLessonsByCourse(course._id),
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }
          );
          
          if (lessonsResponse.ok) {
            const lessonsData = await lessonsResponse.json();
            // Lưu lessons và documents vào state
            setLessons(prev => ({
              ...prev,
              [course._id]: lessonsData
            }));

            // Tạo object chứa documents cho mỗi lesson
            const docsMap = {};
            lessonsData.forEach(lesson => {
              if (lesson.documents) {
                docsMap[lesson._id] = lesson.documents;
              }
            });
            setDocuments(prev => ({
              ...prev,
              ...docsMap
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Có lỗi xảy ra khi tải dữ liệu');
      }
    };

    fetchData();
  }, []);

  const toggleLesson = (lessonId) => {
    setActiveLesson(activeLesson === lessonId ? null : lessonId);
  };

  const handleDeleteLesson = async (lessonId, courseId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài học này?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URLS.deleteLesson(lessonId)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Cập nhật UI sau khi xóa thành công
        setLessons(prev => ({
          ...prev,
          [courseId]: prev[courseId].filter(lesson => lesson._id !== lessonId)
        }));
        setActiveLesson(null);
        alert('Xóa bài học thành công');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Lỗi không xác định' }));
        alert(`Lỗi khi xóa bài học: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
      alert('Có lỗi xảy ra khi xóa bài học');
    }
  };

  const handleEditClick = (lesson) => {
    setEditingLesson(lesson._id);
    setEditForm({
      title: lesson.title,
      content: lesson.content
    });
  };

  const handleEditSubmit = async (lessonId, courseId) => {
    try {
      const response = await fetch(`${API_URLS.updateLesson(lessonId)}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        const updatedData = await response.json();
        // Cập nhật UI sau khi sửa thành công
        setLessons(prev => ({
          ...prev,
          [courseId]: prev[courseId].map(lesson => 
            lesson._id === lessonId 
              ? { ...lesson, ...editForm }
              : lesson
          )
        }));
        setEditingLesson(null);
        alert('Cập nhật bài học thành công');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Lỗi không xác định' }));
        alert(`Lỗi khi cập nhật bài học: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating lesson:', error);
      alert('Có lỗi xảy ra khi cập nhật bài học');
    }
  };

  const handleDeleteDocument = async (docId, lessonId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URLS.deleteDocument(docId)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Cập nhật UI sau khi xóa thành công
        setDocuments(prev => ({
          ...prev,
          [lessonId]: prev[lessonId].filter(doc => doc._id !== docId)
        }));
        alert('Xóa tài liệu thành công');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Lỗi không xác định' }));
        alert(`Lỗi khi xóa tài liệu: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Có lỗi xảy ra khi xóa tài liệu');
    }
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
                      <div className="lesson-actions">
                        <button
                          onClick={() => handleEditClick(lesson)}
                          className="action-button edit-button"
                          title="Chỉnh sửa bài học"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson._id, course._id)}
                          className="action-button delete-button"
                          title="Xóa bài học"
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </div>
                    </div>
                    
                    {editingLesson === lesson._id ? (
                      <div className="edit-form">
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                          className="edit-input"
                          placeholder="Tiêu đề bài học"
                        />
                        <textarea
                          value={editForm.content}
                          onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                          className="edit-textarea"
                          placeholder="Nội dung bài học"
                        />
                        <div className="edit-actions">
                          <button
                            onClick={() => handleEditSubmit(lesson._id, course._id)}
                            className="save-button"
                          >
                            <i className="bi bi-check-lg"></i> Lưu thay đổi
                          </button>
                          <button
                            onClick={() => setEditingLesson(null)}
                            className="cancel-button"
                          >
                            <i className="bi bi-x-lg"></i> Hủy
                          </button>
                        </div>
                      </div>
                    ) : (
                      activeLesson === lesson._id && (
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
                                    <div className="document-container">
                                      <a
                                        href={`${API_URLS.getDocumentById(doc._id)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="document-link"
                                      >
                                        <i className="bi bi-file-earmark-text"></i>
                                        <span>{doc.filename}</span>
                                      </a>
                                      <button
                                        onClick={() => handleDeleteDocument(doc._id, lesson._id)}
                                        className="delete-document-button"
                                        title="Xóa tài liệu"
                                      >
                                        <i className="bi bi-trash3-fill"></i>
                                      </button>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="no-documents">Chưa có tài liệu cho bài học này</p>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
              
              <div className="course-actions">
                <Link 
                  to={`/add-lesson?courseId=${course._id}`}
                  className="add-button"
                >
                  <i className="bi bi-plus-lg"></i> Thêm Bài Học
                </Link>
                <Link 
                  to={`/add-document?courseId=${course._id}`}
                  className="add-button"
                >
                  <i className="bi bi-file-earmark-plus"></i> Thêm Tài Liệu
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
