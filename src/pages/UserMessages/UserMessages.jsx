import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserMessages.css';

const UserMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      const response = await axios.get(
        `http://localhost:5000/api/submissions/feedback/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div className="container">
            <aside className="sidebar">
                <h2>Newlearning</h2>
                <nav>
                    <ul>
                        <li><Link to="/user-dashboard">🏠 Bảng điều khiển</Link></li>
                        <li><Link to="/user-course">📚 Khóa học</Link></li>
                        <li><Link to="/user-exercise">📝 Bài tập</Link></li>
                        <li><Link to="/user-messages">💬 Tin nhắn</Link></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <a href="#settings">⚙️ Cài đặt</a>
                    <a href="#account">👤 Tài khoản</a>
                </div>
            </aside>
      
      <div className="content">
        <div className="messages-container">
          <h2>Phản hồi từ giảng viên</h2>
          <div className="messages-list">
            {messages.map((message) => (
              <div key={message._id} className="message-card">
                <div className="message-header">
                  <h3>{message.exercise_id.title}</h3>
                  <span className="message-date">
                    {new Date(message.createdAt).toLocaleString('vi-VN')}
                  </span>
                </div>
                <div className="message-content">
                  {message.feedback}
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="no-messages">Chưa có phản hồi nào</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMessages; 