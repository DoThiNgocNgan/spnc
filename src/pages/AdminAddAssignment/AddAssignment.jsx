import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddAssignment.css";
import { Link } from "react-router-dom";
import { createExercise } from "../../services/exerciseService";

const AddAssignment = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [formData, setFormData] = useState({
    course_id: "",
    lesson_id: "",
    code: "",
    title: "",
    type: "",
    points: "",
  });
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    // Kiểm tra role từ localStorage hoặc context
    const role = localStorage.getItem('role');
    if (!role || (role !== 'admin' && role !== 'teacher')) {
      navigate('/'); // Chuyển hướng nếu không có quyền
      return;
    }
    setUserRole(role);
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (formData.course_id) {
      fetchLessons(formData.course_id);
    }
  }, [formData.course_id]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/lessons`);
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Vui lòng chọn file PDF!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (pdfFile) {
        formDataToSend.append('pdfFile', pdfFile);
      }

      await createExercise(formDataToSend);
      alert('Bài tập đã được tạo thành công!');
      navigate('/list-homework');
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo bài tập');
      console.error('Error creating exercise:', error);
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
      <main className="main-content">
        <h2>Tạo bài tập mới</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="course_id">Khóa học:</label>
            <select
              id="course_id"
              name="course_id"
              value={formData.course_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn khóa học</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="lesson_id">Bài học:</label>
            <select
              id="lesson_id"
              name="lesson_id"
              value={formData.lesson_id}
              onChange={handleInputChange}
              required
              disabled={!formData.course_id}
            >
              <option value="">Chọn bài học</option>
              {lessons.map(lesson => (
                <option key={lesson._id} value={lesson._id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="code">Mã bài:</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="title">Tên bài:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="type">Loại bài tập:</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn loại bài tập</option>
              <option value="multiple_choice">Trắc nghiệm</option>
              <option value="coding">Lập trình</option>
            </select>
          </div>

          <div>
            <label htmlFor="points">Điểm:</label>
            <input
              type="number"
              id="points"
              name="points"
              value={formData.points}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>

          <div>
            <label htmlFor="pdfFile">File PDF bài tập:</label>
            <input
              type="file"
              id="pdfFile"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Thêm bài tập
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddAssignment;
