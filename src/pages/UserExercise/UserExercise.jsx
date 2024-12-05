import React from 'react';
import { Link } from 'react-router-dom';
import './UserExercise.css'; // Đảm bảo bạn có tệp CSS để định dạng

const UserExercise = () => {
    return (
        <div className="container">
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
              <a href="#messages">💬 Tin nhắn</a>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <a href="#settings">⚙️ Cài đặt</a>
          <a href="#account">👤 Tài khoản</a>
        </div>
      </aside>
            <div className="main-content">
                <select>
                    <option>Ngân xếp và hàng đợi</option>
                    <option>Cây nhị phân tìm kiếm</option>
                    <option>Lý thuyết đồ thị</option>
                </select>
                <table>
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
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserExercise;
