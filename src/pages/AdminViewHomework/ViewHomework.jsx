import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ViewHomework.css";
import AccountDropdown from '../../components/AccountDropdown/AccountDropdown';

const ViewHomework = () => {
  const { studentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [feedback, setFeedback] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, [studentId]);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Gọi API lấy submissions
      const response = await axios.get(
        `http://34.142.187.24:5000/api/submissions/student/${studentId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Submissions response:', response.data); // Debug log

      // Gọi API lấy thông tin user
      const userResponse = await axios.get(
        `http://34.142.187.24:5000/api/submissions/user/${studentId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('User response:', userResponse.data); // Debug log

      setStudentName(userResponse.data.fullname);
      setSubmissions(response.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const downloadCode = (submission) => {
    // Tạo file txt từ code
    const blob = new Blob([submission.code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submission_${submission._id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleFeedback = async (submissionId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://34.142.187.24:5000/api/submissions/feedback/${submissionId}`,
        { feedback },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Cập nhật lại danh sách submissions
      fetchSubmissions();
      setFeedback('');
      setSelectedSubmission(null);
    } catch (error) {
      console.error("Error sending feedback:", error);
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
      <div className="content">
        <h2>Bài tập của: {studentName}</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Tên bài</th>
              <th>Trạng thái</th>
              <th>Thời gian nộp</th>
              <th>Chi tiết</th>
              <th>Phản hồi</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td>{submission.exercise_id.title}</td>
                <td>{submission.score ? 'Đã chấm điểm' : 'Chưa chấm điểm'}</td>
                <td>{new Date(submission.createdAt).toLocaleString('vi-VN')}</td>
                <td>
                  <button 
                    className="view-button"
                    onClick={() => downloadCode(submission)}
                  >
                    Tải code
                  </button>
                </td>
                <td>
                  {selectedSubmission === submission._id ? (
                    <div>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Nhập phản hồi..."
                      />
                      <button 
                        className="feedback-button"
                        onClick={() => handleFeedback(submission._id)}
                      >
                        Gửi
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="feedback-button"
                      onClick={() => setSelectedSubmission(submission._id)}
                    >
                      Phản hồi
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewHomework;
