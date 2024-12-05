import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Bảng điều khiển Quản trị viên</h2>
      <nav>
        <ul>
          <li><Link to="/admin/users">Quản lý người dùng</Link></li>
          <li><Link to="/admin/courses">Quản lý khóa học</Link></li>
          <li><Link to="/admin/exercises">Quản lý bài tập</Link></li>
          <li><Link to="/admin/documents">Quản lý tài liệu</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard; 