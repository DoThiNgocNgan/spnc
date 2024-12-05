import React from "react";
import "./ListHomework.css";
import { Link } from "react-router-dom";

const ListHomework = () => {
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
      <div className="main-content">
        <h2>Danh sách Bài tập</h2>
        <Link to="/add-assignment">
          <button className="add-button">Thêm bài tập</button>
        </Link>
        <select className="homework-select">
          <option value="stack and queue">Ngăn xếp và hàng đợi</option>
          <option value="bst">Cây nhị phân tìm kiếm</option>
          <option value="graph">Lý thuyết đồ thị</option>
        </select>
        <table className="homework-table">
          <thead>
            <tr>
              <th>stt</th>
              <th>Mã bài</th>
              <th>Tên bài</th>
              <th>Điểm exp</th>
              <th>S/L đúng</th>
            </tr>
          </thead>
          <tbody>
            {/* Example rows */}
            <tr>
              <td>1</td>
              <td>ChiaDoAn</td>
              <td>Chia Đồ Ăn</td>
              <td>30</td>
              <td>11/20</td>
              
            </tr>
            <tr>
              <td>2</td>
              <td>BSTree_Test</td>
              <td>Cây nhị phân tìm kiếm</td>
              <td>20</td>
              <td>13/28</td>
              
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListHomework;
