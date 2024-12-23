import React, { useState, useEffect } from "react";
import "./ListHomework.css";
import { Link } from "react-router-dom";
import { getExercisesByLesson } from "../../services/exerciseService";
import axios from 'axios';
import { API_URLS } from "../../api/api";
import AccountDropdown from '../../components/AccountDropdown/AccountDropdown';

const ListHomework = () => {
  const [activeLesson, setActiveLesson] = useState(null);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState({});
  const [exercises, setExercises] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
      data.forEach(course => fetchLessons(course._id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/lessons`);
      if (!response.ok) throw new Error('Failed to fetch lessons');
      const data = await response.json();
      setLessons(prev => ({
        ...prev,
        [courseId]: data
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchExercises = async (lessonId) => {
    setLoading(true);
    try {
      const data = await getExercisesByLesson(lessonId);
      setExercises(prev => ({
        ...prev,
        [lessonId]: data
      }));
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setExercises(prev => ({
        ...prev,
        [lessonId]: []
      }));
    } finally {
      setLoading(false);
    }
  };

  const toggleLesson = (lessonId) => {
    if (activeLesson === lessonId) {
      setActiveLesson(null);
    } else {
      setActiveLesson(lessonId);
      fetchExercises(lessonId);
    }
  };

  const handleViewPdf = (pdfPath) => {
    const pdfUrl = `http://localhost:5000/${pdfPath}`;
    window.open(pdfUrl, '_blank');
  };

  const handleDeleteExercise = async (exerciseId, lessonId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài tập này?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_URLS.deleteExercise(exerciseId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Cập nhật UI sau khi xóa thành công
        setExercises(prev => ({
          ...prev,
          [lessonId]: prev[lessonId].filter(ex => ex._id !== exerciseId)
        }));
        alert('Xóa bài tập thành công');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Lỗi không xác định' }));
        alert(`Lỗi khi xóa bài tập: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting exercise:', error);
      alert('Có lỗi xảy ra khi xóa bài tập');
    }
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="logo">
          <span>Newlearning</span>
        </div>
        <ul>
          <li><Link to="/admin-home"><i className="icon">📊</i> Bảng điều khiển</Link></li>
          <li><Link to="/admin"><i className="icon">📚</i> Khóa học</Link></li>
          <li><Link to="/list-homework"><i className="icon">📝</i> Bài tập</Link></li>
          <li><Link to="/view-progress"><i className="icon">🚀</i> Đánh giá</Link></li>
        </ul>
        <div className="nav-footer">
          <Link to="#settings">
            <i className="icon">⚙️</i> Cài đặt
          </Link>
          <AccountDropdown />
        </div>
      </nav>

      <div className="course-list">
        {courses.map(course => (
          <div key={course._id} className="course">
            <h2>{course.title}</h2>
            <div className="lessons-container">
              {lessons[course._id]?.map(lesson => (
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

                        <div className="exercises-section">
                          <h4>Bài tập trong bài học:</h4>
                          {loading ? (
                            <div className="loading">Đang tải bài tập...</div>
                          ) : exercises[lesson._id]?.length > 0 ? (
                            <ul className="exercises-list">
                              {exercises[lesson._id].map(exercise => (
                                <li key={exercise._id} className="exercise-item">
                                  <div className="exercise-info">
                                    <div className="exercise-header">
                                      <div 
                                        className="exercise-title clickable"
                                        onClick={() => handleViewPdf(exercise.pdfFile)}
                                      >
                                        <h5>{exercise.title}</h5>
                                        <span className="exercise-type">
                                          {exercise.type === 'coding' ? 'Bài tập lập trình' : 'Bài tập trắc nghiệm'}
                                        </span>
                                      </div>
                                      <div className="exercise-actions">
                                        <button
                                          onClick={() => handleDeleteExercise(exercise._id, lesson._id)}
                                          className="delete-exercise-button"
                                          title="Xóa bài tập"
                                        >
                                          <i className="bi bi-trash3-fill"></i>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="exercise-content">
                                      <p className="points">Điểm: {exercise.points}</p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="no-exercises">Chưa có bài tập nào trong bài học này</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="course-actions">
              <Link 
                to={`/add-assignment?courseId=${course._id}`}
                className="add-button"
              >
                Thêm Bài Tập
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListHomework;
