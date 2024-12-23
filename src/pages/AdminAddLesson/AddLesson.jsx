import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddLesson.css"; // Create a CSS file for styling
import { API_URLS } from "../../api/api";
import AccountDropdown from '../../components/AccountDropdown/AccountDropdown';

const AddLesson = () => {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [lessonContent, setLessonContent] = useState(""); // New state for lesson content
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_URLS.getCourses, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const lessonData = {
      course_id: selectedCourseId,
      title: lessonName,
      content: lessonContent, // Use the new content state
    };

    try {
      const response = await fetch(API_URLS.createLesson, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(lessonData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        navigate('/admin-home'); // Redirect to admin home after successful creation
      } else {
        const errorData = await response.json();
        alert(errorData.message); // Alert the user if there's an error
      }
    } catch (error) {
      console.error('Error during lesson creation:', error);
    }
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="logo">
          <span>Newlearning</span>
        </div>
        <ul>
          <li className="active">
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
        <div className="nav-footer">
          <Link to="#settings">
            <i className="icon">⚙️</i> Cài đặt
          </Link>
          <AccountDropdown />
        </div>
      </nav>
      <div className="main-content">
        <h2>Thêm Bài Học</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="courseName">Tên Khóa Học:</label>
            <select
              id="courseName"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              required
            >
              <option value="">Chọn khóa học</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>{course.title}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="lessonName">Tên Bài Học:</label>
            <input
              type="text"
              id="lessonName"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lessonContent">Nội dung Bài Học:</label>
            <textarea
              id="lessonContent"
              value={lessonContent}
              onChange={(e) => setLessonContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Thêm Bài Học
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;