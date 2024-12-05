import React, { useState } from "react";
import "./UserHomework.css";
import { Link } from "react-router-dom";
const UserHomework = () => {
  const [code, setCode] = useState("// Viết code của bạn ở đây");

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
              <Link to="/user-homework">📝 Bài tập</Link>
            </li>
            <li>
              <a href="#messages">💬 Tin nhắn</a>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <a href="#settings">⚙️ Cài đặt</a>
          <a href="#account">👤 Tài khoản</a>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="homework-container">
          <section className="instruction-panel"></section>
          <section className="code-editor">
            <div className="editor-header">
              <span className="file-name">main.py</span>
              <div className="editor-controls">
                <button>{"</"}</button>
                <button>{"{}"}</button>
                <button>⚙️</button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="code-textarea"
              placeholder="# Viết code Python của bạn ở đây"
            />
            <div className="editor-footer">
              <button className="run-button">Chạy</button>
              <button className="submit-button">Nộp bài</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserHomework; // Changed export name to UserHomework
