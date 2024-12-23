import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountDropdown.css';

const AccountDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/home');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      <i className="icon">🚪</i> Đăng xuất
    </button>
  );
};

export default AccountDropdown;