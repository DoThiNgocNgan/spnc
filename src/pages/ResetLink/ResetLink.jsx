import React, { useState } from 'react';
import { API_URLS } from '../../api/api';
import './ResetLink.css';
import { useNavigate } from 'react-router-dom';

const ResetLink = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch(API_URLS.forgotPassword, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setIsSuccess(true);
                setMessage('Link đặt lại mật khẩu đã được gửi đến email của bạn!');
                // Tự động chuyển về trang home sau 3 giây
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } else {
                setMessage(data.message || 'Có lỗi xảy ra, vui lòng thử lại.');
            }
        } catch (error) {
            setMessage('Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="reset-link-container">
            <div className="form-container">
                <h2>Quên mật khẩu</h2>
                {isSuccess ? (
                    <div className="success-message">
                        <p>{message}</p>
                        <p>Đang chuyển hướng về trang đăng nhập...</p>
                    </div>
                ) : (
                    <>
                        <p>Nhập email để nhận liên kết đặt lại mật khẩu.</p>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="email" 
                                placeholder="sample@gmail.com" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                            <button 
                                type="submit" 
                                className='reset-link-button'
                                disabled={isLoading}
                            >
                                {isLoading ? 'Đang gửi...' : 'Gửi liên kết đặt lại mật khẩu'}
                            </button>
                        </form>
                        {message && <p className={isSuccess ? 'success-message' : 'error-message'}>{message}</p>}
                    </>
                )}
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
