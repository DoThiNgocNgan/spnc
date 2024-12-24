import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2"; // Hoặc thư viện biểu đồ bạn chọn
import Chart from "chart.js/auto"; // Ensure Chart.js is imported
import "./AdminHome.css"; // Tạo file CSS để định dạng
import { Link } from "react-router-dom"; // Thêm import Link
import AccountDropdown from '../../components/AccountDropdown/AccountDropdown';

const AdminHome = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Dữ liệu cho biểu đồ lượt truy cập
  const trafficData = {
    labels: ["1 Jan", "2 Jan", "3 Jan", "4 Jan", "5 Jan", "6 Jan", "7 Jan"],
    datasets: [
      {
        label: "Lượt truy cập",
        data: [30000, 40000, 35000, 50000, 45000, 60000, 70000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Dữ liệu cho biểu đồ lượt đăng ký
  const registrationData = {
    labels: ["1 Jan", "2 Jan", "3 Jan", "4 Jan", "5 Jan", "6 Jan", "7 Jan"],
    datasets: [
      {
        label: "Lượt đăng ký",
        data: [10, 20, 15, 30, 25, 40, 35],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const trafficChartRef = useRef(null); // Create a ref for the traffic chart
  const registrationChartRef = useRef(null); // Create a ref for the registration chart

  useEffect(() => {
    // Cleanup function to destroy charts
    return () => {
      if (trafficChartRef.current) {
        const trafficChartInstance = Chart.getChart(trafficChartRef.current.id);
        if (trafficChartInstance) {
          trafficChartInstance.destroy();
        }
      }
      if (registrationChartRef.current) {
        const registrationChartInstance = Chart.getChart(
          registrationChartRef.current.id
        );
        if (registrationChartInstance) {
          registrationChartInstance.destroy();
        }
      }
    };
  }, []);

  return (
    <div className="dashboard">
      <nav className={`dashboard-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="logo">
          <span>Newlearning</span>
        </div>

        <button 
          className="mobile-menu-button show-on-mobile"
          onClick={toggleMobileMenu}
        >
          ☰
        </button>

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
      <div className="dashboard-content">
        <div className="charts-container">
          <div className="chart-item">
            <h2>Thống kê lượt truy cập</h2>
            <Bar ref={trafficChartRef} data={trafficData} />
          </div>
          <div className="chart-item">
            <h2>Thống kê lượt đăng ký</h2>
            <Bar ref={registrationChartRef} data={registrationData} />
          </div>
        </div>
        <div className="top-students">
          <h2>Top Học Sinh</h2>
          <div className="students-list">
            <div className="student-item">
              <img
                src="src/assets/avatar1.png"
                alt="Nil Yeager"
                className="student-avatar"
              />
              <span>Minh Tú - 95 điểm</span>
            </div>
            <div className="student-item">
              <img
                src="src/assets/avatar2.png"
                alt="Theron Trump"
                className="student-avatar"
              />
              <span>Duy An - 90 điểm</span>
            </div>
            <div className="student-item">
              <img
                src="src/assets/avatar3.png"
                alt="Tyler Mark"
                className="student-avatar"
              />
              <span>Thúy Ngân - 88 điểm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminHome;
