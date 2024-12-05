import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import './CreateAccount.css';
import { API_URLS } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const CreateAccount = ({ onOpenSignIn }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    token: '',
  });

  const [role, setrole] = useState('student');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleroleChange = (type) => {
    setrole(type);
    setShowTokenInput(type === 'teacher');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role === 'teacher' && !formData.token) {
      alert('Please enter the token to proceed.');
      return;
    }
    
    try {
      const response = await fetch(API_URLS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          role: role,
          token: role === 'teacher' ? formData.token : undefined
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log('User registered successfully:', data);
        if (role === 'teacher') {
          navigate('/admin-home');
        } else {
          onOpenSignIn();
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="create-account-container">
      <h2>Tạo tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Họ và tên"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mật khẩu"
            required
          />
        </div>
        <div className="input-group user-type-selection">
          <div onClick={() => handleroleChange('student')} className={`user-type-icon ${role === 'student' ? 'active' : ''}`}>
            <span>👨‍🎓</span>
            <p>Học viên</p>
          </div>
          <div onClick={() => handleroleChange('teacher')} className={`user-type-icon ${role === 'teacher' ? 'active' : ''}`}>
            <span>👩‍🏫</span>
            <p>Giáo viên</p>
          </div>
        </div>
        {showTokenInput && (
          <div className="input-group">
            <input
              type="text"
              name="token"
              value={formData.token}
              onChange={handleChange}
              placeholder="Token"
              required
            />
          </div>
        )}
        <button type="submit" className="create-account-button">Tạo tài khoản</button>
      </form>
      <p className="login-link">Đã có tài khoản? <span onClick={onOpenSignIn} style={{ cursor: 'pointer', color: '#007bff' }}>Đăng nhập</span></p>
    </div>
  );
};

export default CreateAccount;