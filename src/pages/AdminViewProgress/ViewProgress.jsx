import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./ViewProgress.css";
import AccountDropdown from '../../components/AccountDropdown/AccountDropdown';

const ViewProgress = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.get('http://34.142.187.24:5000/api/users/students', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setStudents(response.data.map(student => ({
        _id: student._id,
        name: student.fullname,
        assignments: student.assignments || 0
      })));
    } catch (error) {
      console.error("Error fetching students:", error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const calculateProgress = (assignments) => {
    if (!assignments || assignments.length === 0) return "0%";
    // Tính toán tiến độ dựa trên số bài đã hoàn thành
    const completedAssignments = assignments.filter(assignment => assignment.completed).length;
    const progress = (completedAssignments / assignments.length) * 100;
    return `${Math.round(progress)}%`;
  };

  const handleViewProgress = (studentId) => {
    navigate(`/view-homework/${studentId}`);
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
      <div className="progress-table">
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Tên</th>
              <th style={{ textAlign: "center" }}>Số bài đã nộp</th>
              <th style={{ textAlign: "center" }}>Tiến trình</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id || index}>
                <td style={{ textAlign: "center" }}>{student.name}</td>
                <td style={{ textAlign: "center" }}>
                  {student.assignments} bài
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="view-progress-button"
                    onClick={() => handleViewProgress(student._id)}
                  >
                    Xem tiến độ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProgress;
