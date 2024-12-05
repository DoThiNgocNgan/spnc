import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import SignIn from '../SignIn/SignIn';
import CreateAccount from '../CreateAccount/CreateAccount';

export default function Home() {
    const categories = [
      { image: 'src/assets/web_development.png', name: 'Phát triển Web'},
      { image: 'src/assets/software_engineering.png', name: 'Kỹ sư phần mềm'},
      { image: 'src/assets/computer_science.png', name: 'Khoa học máy tính'},
      { image: 'src/assets/information_technology.png', name: 'Công nghệ thông tin'},
      { image: 'src/assets/database_administration.png', name: 'Quản lý cơ sở dữ liệu'},
      { image: 'src/assets/video_game_design.png', name: 'Thiết kế game'},
    ];
    
    const [isSignInOpen, setSignInOpen] = useState(false);
    const [isCreateAccountOpen, setCreateAccountOpen] = useState(false);

    const openSignIn = () => {
        setCreateAccountOpen(false);
        setSignInOpen(true);
    };

    const closeSignIn = () => setSignInOpen(false);
    
    const openCreateAccount = () => {
        setSignInOpen(false);
        setCreateAccountOpen(true);
    };

    const closeCreateAccount = () => setCreateAccountOpen(false);

    return (
      <div className="app">
        <header className="main-header">
          <nav className="main-nav" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className="logo">
              <span>Newlearning</span>
            </div>
            <div className="nav-links">
              <Link to="/home" className="nav-link">Trang chủ</Link>
              <Link to="/courses" className="nav-link">Khóa học</Link>
              <Link to="/about" className="nav-link">Về chúng tôi</Link>
              <Link to="/contact" className="nav-link">Liên hệ</Link>
            </div>
            <div className="nav-actions">
              <button onClick={openSignIn} className="account-button">Đăng nhập</button>
              <button onClick={openCreateAccount} className="create-account-button">Tạo tài khoản</button>
            </div>
          </nav>
        </header>
  
        <main>
          <section className="hero">
            <div className="hero-content">
              <h1>Giáo dục là chìa khóa để mở rộng kiến thức</h1>
              <p>Giáo dục giúp con người phát triển tư duy phản biện và thích nghi với sự thay đổi của thế giới. Nó cung cấp sự phát triển cá nhân và xã hội.</p>
              <div className="hero-buttons">
                <button className="try-now">Thử ngay</button>
                <button className="play-video">Xem video</button>
              </div>
            </div>
            <div className="hero-image">
              <img src="src/assets/girl.jpg" alt="Student" />
            </div>
          </section>
  
          <section className="stats">
            <div className="stat-item">
              <div className="stat-icon">
                <img src="src/assets/visit.png" alt="Monthly Visits" />
              </div>
              <div className="stat-content">
                <h3>1M+</h3>
                <p>Lượt truy cập hàng tháng</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <img src="src/assets/gwth.png" alt="Monthly Visits Growth" />
              </div>
              <div className="stat-content">
                <h3>80%</h3>
                <p>Tăng trưởng lượt truy cập</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <img src="src/assets/active.png" alt="Active Students" />
              </div>
              <div className="stat-content">
                <h3>1k+</h3>
                <p>Học sinh tham gia</p>
              </div>
            </div>
          </section>
  
          <section className="top-categories">
            <h2 className="section-title">Các chuyên ngành công nghệ thông tin hàng đầu</h2>
            <div className="category-grid">
              {categories.map((category, index) => (
                <div key={index} className={`category-card ${index === 1 ? 'featured' : ''}`}>
                  <div className="category-icon">
                    <img src={category.image} alt={category.name} className="category-image" />
                  </div>
                  <h3>{category.name}</h3>
                </div>
              ))}
            </div>
          </section>
          <section className="latest-blogs">
            <h2>Các khóa học thịnh hành của chúng tôi</h2>
            <div className="blog-container">
              <div className="blog-card">
                <img src="src/assets/Stack_vs_Queue.png" alt="Stack and Queue" />
                <h3>Stack and Queue là cấu trúc dữ liệu cơ bản trong khoa học máy tính. Một Stack tuân theo nguyên tắc Last In, First Out (LIFO), trong khi một Queue hoạt động trên cơ sở First In, First Out (FIFO), cả hai đều hữu ích cho việc quản lý dữ liệu trong nhiều thuật toán.</h3>
                <Link to="/course/stack-and-queue" className="read-more">Xem thêm</Link>
              </div>
              <div className="blog-card">
                <img src="src/assets/binary_tree.png" alt="Binary Tree" />
                <h3>Cây nhị phân là một cấu trúc dữ liệu cây trong đó mỗi nút có nhiều nhất hai con, thường được gọi là con trái và con phải. Nó được sử dụng trong nhiều ứng dụng, bao gồm các hệ thống tệp, cơ sở dữ liệu và các quá trình ra quyết định.</h3>
                <Link to="/course/binary-tree" className="read-more">Xem thêm</Link>
              </div>
              <div className="blog-card">
                <img src="src/assets/grapth_theory.png" alt="Graph Theory" />
                <h3>Lý thuyết đồ thị là một nhánh của toán học nghiên cứu các thuộc tính và mối quan hệ giữa các đối tượng được biểu diễn bởi các điểm và đường. Nó được sử dụng trong nhiều ứng dụng, bao gồm phân tích mạng, đồ họa máy tính và phân tích mạng xã hội.</h3>
                <Link to="/course/graph-theory" className="read-more">Xem thêm</Link>
              </div>
            </div>
          </section>
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-logo">
                <h2><span>Newlearning</span></h2>
                <p>Nền tảng học tập trực tuyến để nâng cao kỹ năng</p>
                <div className="social-links">
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
              <div className="footer-links">
                <h3>Tài nguyên</h3>
                <ul>
                  <li><Link to="/">Trang chủ</Link></li>
                  <li><Link to="/courses">Khóa học</Link></li>
                  <li><Link to="/blog">Bài viết</Link></li>
                  <li><Link to="/terms">Điều khoản và điều kiện</Link></li>
                </ul>
              </div>
              <div className="footer-contact">
                <h3>Liên hệ</h3>
                <ul>
                  <li><i className="fas fa-phone"></i> +0477 8576 852</li>
                  <li><i className="fas fa-phone"></i> +0477 8576 825</li>
                  <li><i className="fas fa-envelope"></i> info@themeuser.com</li>
                  <li><i className="fas fa-map-marker-alt"></i> 123, New Lenio, Chicago</li>
                </ul>
              </div>
              <div className="footer-newsletter">
                <h3>Đăng ký nhận bản tin của chúng tôi</h3>
                <p>Đăng ký nhận bản tin và nhận được nhiều nội dung hấp dẫn được gửi đến hộp thư của bạn mỗi tuần</p>
                <form>
                  <input type="email" placeholder="Nhập email của bạn" />
                  <button type="submit">Đăng ký</button>
                </form>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 Tất cả các quyền được bảo lưu. Điều khoản và điều kiện và Chính sách bảo mật</p>
            </div>
          </footer>          
        </main>

        {/* Sign In Popup */}
        {isSignInOpen && (
          <div className="popup">
            <div className="popup-content">
              <button className="close" onClick={closeSignIn}>✖</button>
              <SignIn onOpenCreateAccount={openCreateAccount} />
            </div>
          </div>
        )}

        {/* Create Account Popup */}
        {isCreateAccountOpen && (
          <div className="popup">
            <div className="popup-content">
              <button className="close" onClick={closeCreateAccount}>✖</button>
              <CreateAccount onOpenSignIn={openSignIn} />
            </div>
          </div>
        )}
      </div>
    );
}
