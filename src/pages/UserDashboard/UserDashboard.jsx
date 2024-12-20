import React from "react";
import "./UserDashboard.css";
import { Link } from "react-router-dom";

const UserDashboard = () => {
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
        <div className="welcome-section">
          <h1>Chào mừng đến với khóa học của tôi</h1>
          <img src="src/assets/wellcome.png" alt="Welcome" />
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
