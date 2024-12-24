import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URLS } from "../../api/api";
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu không khớp!");
      return;
    }
    
    setIsLoading(true);
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
        setMessage("Mật khẩu đã được đặt lại thành công!");
        // Chuyển về trang đăng nhập sau 2 giây
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Đã xảy ra lỗi, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-form">
        <h2>Đặt mật khẩu mới</h2>
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
          <button 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
          </button>
        </form>
        {message && (
          <p className={message.includes('thành công') ? 'success-message' : 'error-message'}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
