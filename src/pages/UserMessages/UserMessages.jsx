import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserMessages.css';
import AccountDropdown from '../../components/AccountDropdown/AccountDropdown';

const UserMessages = () => {
  const [messages, setMessages] = useState([]);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      const response = await axios.get(
        `http://34.142.187.24:5000/api/submissions/feedback/${userId}`,
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

  const toggleMessage = (messageId) => {
    setExpandedMessageId(expandedMessageId === messageId ? null : messageId);
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
                    <AccountDropdown />
                </div>
            </aside>
      
      <div className="content">
        <div className="messages-container">
          <h2>Phản hồi từ giảng viên</h2>
          <div className="messages-list">
            {messages.map((message) => (
              <div key={message._id} className="message-card">
                <div 
                  className="message-header"
                  onClick={() => toggleMessage(message._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{message.exercise_id.title}</h3>
                  <div className="message-header-right">
                    <span className="message-date">
                      {new Date(message.createdAt).toLocaleString('vi-VN')}
                    </span>
                    <span className="expand-icon">
                      {expandedMessageId === message._id ? '▼' : '▶'}
                    </span>
                  </div>
                </div>
                {expandedMessageId === message._id && (
                  <div className="message-content">
                    {message.feedback}
                  </div>
                )}
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