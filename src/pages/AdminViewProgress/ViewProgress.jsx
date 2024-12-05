import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ViewProgress.css";

const ViewProgress = () => {
  const navigate = useNavigate();
  const students = [
    { name: "Bea", xp: 1000, assignments: 2, progress: "50%" },
    { name: "Eddy", xp: 2900, assignments: 3, progress: "75%" },
    { name: "Junior", xp: 2340, assignments: 2, progress: "50%" },
    { name: "Lin", xp: 1400, assignments: 4, progress: "100%" },
    { name: "Oscar", xp: 200, assignments: 1, progress: "25%" },
    { name: "Vikram", xp: 0, assignments: 0, progress: "0%" },
  ];

  const handleViewProgress = () => {
    navigate("/view-homework");
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
      <div className="progress-table">
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Tên</th>
              <th style={{ textAlign: "center" }}>Tổng điểm</th>
              <th style={{ textAlign: "center" }}>Số lượng bài tập</th>
              <th style={{ textAlign: "center" }}>Tiến trình</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{student.name}</td>
                <td style={{ textAlign: "center" }}>{student.xp} XP</td>
                <td style={{ textAlign: "center" }}>
                  {student.assignments} bài tập
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="view-progress-button"
                    onClick={handleViewProgress}
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
