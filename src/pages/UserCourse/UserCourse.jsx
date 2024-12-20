import React, { useEffect, useState } from "react";
import "./UserCourse.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URLS } from "../../api/api";

const UserCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_URLS.getCourses);
        const data = await response.json();
        console.log('Courses data:', data);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId, courseTitle) => {
    navigate(`/user-view-lesson?courseId=${courseId}&courseTitle=${courseTitle}`);
  };

  const getImageUrl = (imageName) => {
    return new URL(`../../assets/images/${imageName}`, import.meta.url).href;
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Newlearning</h2>
        <nav>
          <ul>
            <li>
              <Link to="/user-dashboard">🏠 Bảng điều khiển</Link>
            </li>
            <li>
              <Link to="/user-course">📚 Khóa học</Link>
            </li>
            <li>
              <Link to="/user-exercise">📝 Bài tập</Link>
            </li>
            <li>
              <Link to="/user-messages">💬 Tin nhắn</Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <a href="#settings">⚙️ Cài đặt</a>
          <a href="#account">👤 Tài khoản</a>
        </div>
      </aside>

      <main className="main-content">
        <header>
          <h1>Khóa học của tôi</h1>
        </header>

        <section className="course-section">
          <div className="course-grid">
            {courses.map(course => {
              console.log('Image path:', getImageUrl(course.image));
              return (
                <button 
                  className="course-button" 
                  key={course._id} 
                  onClick={() => handleCourseClick(course._id, course.title)}
                >
                  <img 
                    src={getImageUrl(course.image)}
                    alt={course.title}
                    className="course-image"
                    onError={(e) => {
                      console.log(`Failed to load image: ${course.image}`);
                      e.target.onerror = null;
                      e.target.src = getImageUrl('placeholder.png');
                    }}
                  />
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </button>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserCourse;
