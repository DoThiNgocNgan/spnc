import React, { useState, useEffect } from "react";
import "./AddDocument.css";
import { Link } from "react-router-dom";
import { API_URLS } from "../../api/api";

const AddDocument = () => {
  const [courseId, setCourseId] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_URLS.courses);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Fetch lessons based on the selected course
  useEffect(() => {
    const fetchLessons = async () => {
      if (courseId) {
        try {
          const response = await fetch(API_URLS.getLessonsByCourse(courseId));
          const data = await response.json();
          setLessons(data);
        } catch (error) {
          console.error("Error fetching lessons:", error);
        }
      } else {
        setLessons([]); // Reset lessons if no course is selected
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fileUpload", fileUpload);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(API_URLS.uploadDocument(lessonId), {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setCourseId("");
        setLessonId("");
        setFileUpload(null);
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        alert("Error: " + errorText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the document.");
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
          <Link to="#account">
            <i className="icon">👤</i> Tài khoản
          </Link>
        </div>
      </nav>
      <div className="content" style={{ width: "100%", marginLeft: "auto" }}>
        <h2>Thêm Tài Liệu</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="courseId">Tên Khóa Học:</label>
            <select
              id="courseId"
              name="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              <option value="">Chọn khóa học</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="lessonId">Tên Bài Học:</label>
            <select
              id="lessonId"
              name="lessonId"
              value={lessonId}
              onChange={(e) => setLessonId(e.target.value)}
              required
            >
              <option value="">Chọn bài học</option>
              {lessons.map((lesson) => (
                <option key={lesson._id} value={lesson._id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fileUpload">Tải lên tài liệu (PDF):</label>
            <input
              type="file"
              id="fileUpload"
              name="file" // Ensure this matches the backend
              accept=".pdf"
              onChange={(e) => setFileUpload(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Thêm Tài Liệu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDocument;