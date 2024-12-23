import React from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
import AccountDropdown from '../../components/AccountDropdown/AccountDropdown';

const Admin = () => {
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

      <main className="dashboard-main">
        <header>
          <h1>Khóa học</h1>
        </header>

        <div className="course-menu">
          <Link to="/list-document" className="course-item">
            <h3>Ngăn xếp và hàng đợi</h3>
            <p>Tìm hiểu một vài kiểu dữ liệu tuyến tính</p>
            <span className="course-info">5 tuần | Người mới</span>
          </Link>
          <Link to="/list-document" className="course-item">
            <h3>Cây tìm kiếm nhị phân</h3>
            <p>Tìm hiểu cây tìm kiếm nhị phân  </p>
            <span className="course-info">5 tuần | Trung bình</span>
          </Link>
          <Link to="/list-document" className="course-item">
            <h3>Lý thuyết đồ thị</h3>
            <p>Tìm hiểu kĩ thuật duyệt đồ thị và ứng dụng</p>
            <span className="course-info">8 tuần | Nâng cao</span>
          </Link>
        </div>

        {/* Placeholder for other content */}
      </main>
    </div>
  );
};

export default Admin;
