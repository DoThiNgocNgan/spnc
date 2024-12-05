import React from "react";
import "./ViewHomework.css";
import { Link } from "react-router-dom";

const ViewHomework = () => {
  const assignments = [
    {
      name: "Assignment 1",
      status: "Đã nộp",
      dueTime: "Jan 20",
      details: "Xem",
    },
    {
      name: "Assignment 2",
      status: "Chưa nộp",
      dueTime: "Jan 22",
      details: "Xem",
    },
    {
      name: "Programming Assignment 1",
      status: "Đã nộp",
      dueTime: "Jan 06",
      details: "Xem",
    },
    {
      name: "Midterm Exam",
      status: "Chưa đánh giá",
      dueTime: "Jan 13",
      details: "Xem",
    },
  ];

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
      <div className="content">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Trạng thái</th>
              <th>Thời gian nộp</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.name}</td>
                <td>{assignment.status}</td>
                <td>{assignment.dueTime}</td>
                <td>
                  <button className="view-button">{assignment.details}</button>
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
