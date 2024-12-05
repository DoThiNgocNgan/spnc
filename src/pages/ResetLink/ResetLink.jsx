import React, { useState } from 'react';
import './ResetLink.css';

const ResetLink = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email sent to:', email);
    };

    return (
        <div className="reset-link-container">
            <div className="form-container">
                <h2>Quên mật khẩu</h2>
                <p>Nhập email để nhận liên kết đặt lại mật khẩu.</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="sample@gmail.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <button type="submit" className='reset-link-button'>Gửi liên kết đặt lại mật khẩu</button>
                </form>
                <p>Nhớ mật khẩu? <a href="/login">Đăng nhập</a></p>
            </div>
            <div className="info-container">
            <h2>Không truy cập được tài khoản?</h2>
             <p>Chỉ cần nhập email đã đăng ký, chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.</p>
            <ul style={{ display: 'flex', margin: 0, padding: 0 }}>
                <li style={{ marginRight: '10px' }}>✔️ Nhanh chóng và an toàn</li>
                <li style={{ marginRight: '10px' }}>✔️ Bảo mật dữ liệu</li>
                <li>✔️ Hỗ trợ 24/7</li>
            </ul>
            </div>
        </div>
    );
};

export default ResetLink;
