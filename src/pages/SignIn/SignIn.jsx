import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./SignIn.css";
import { API_URLS } from "../../api/api"; // Import the API URLs

const SignIn = ({ onOpenCreateAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false); // Thêm state để theo dõi lỗi đăng nhập
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(false);
    try {
      const response = await fetch(API_URLS.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json().catch(() => null);
      if (response.ok && data) {
        console.log("Đăng nhập thành công:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role);

        if (data.role === "admin" || data.role === "teacher") {
          navigate("/admin-home");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        setLoginError(true);
        alert(data ? data.message : "Đã xảy ra lỗi không xác định.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError(true);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Vui lòng nhập email của bạn để lấy lại mật khẩu.");
      return;
    }
    try {
      const response = await fetch(API_URLS.forgotPassword, { // Thay đổi API_URLS.forgotPassword thành URL thực tế
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Email xác nhận đã được gửi đến địa chỉ của bạn.");
      } else {
        alert(data.message); // Hiển thị thông báo lỗi từ backend
      }
    } catch (error) {
      console.error("Error during forgot password:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <div className="sign-in-container">
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>

      {loginError && ( // Hiển thị dòng "Quên mật khẩu?" nếu có lỗi
        <p>
          <span 
            style={{ cursor: "pointer", color: "#007bff" }} 
            onClick={handleForgotPassword} // Gọi hàm khi nhấp vào
          >
            Quên mật khẩu?
          </span>
        </p>
      )}

      <p>
        Bạn chưa có tài khoản?{" "}
        <span
          onClick={onOpenCreateAccount}
          style={{ cursor: "pointer", color: "#007bff" }}
        >
          Tạo một
        </span>
      </p>
    </div>
  );
};

export default SignIn;
