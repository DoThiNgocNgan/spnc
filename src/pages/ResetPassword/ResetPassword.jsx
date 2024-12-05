import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { API_URLS } from "../../api/api";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    try {
      const response = await fetch(API_URLS.resetPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Mật khẩu đã được đặt lại thành công!");
        // Redirect to login or another page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during reset password:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-form">
        <h2>Đặt mật khẩu mới</h2>
        <p>Bạn có thể đặt mật khẩu mới cho tài khoản của mình.</p>
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Đặt lại mật khẩu</button>
        </form>
        <p>
          Quay lại đăng nhập? <a href="/login">Đăng nhập</a>
        </p>
      </div>
      <div className="reset-password-info">
        <h2>Bạn không thể truy cập vào tài khoản của mình?</h2>
        <p>
          Đừng lo! Chỉ cần nhập email đã đăng ký, chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.
        </p>
        <ul style={{ display: 'flex', margin: 0, padding: 0 }}>
          <li style={{ marginRight: '10px' }}>✔️ Nhanh chóng và an toàn</li>
          <li style={{ marginRight: '10px' }}>✔️ Bảo mật dữ liệu</li>
          <li>✔️ Hỗ trợ 24/7</li>
        </ul>
      </div>
    </div>
  );
};

export default ResetPassword;
