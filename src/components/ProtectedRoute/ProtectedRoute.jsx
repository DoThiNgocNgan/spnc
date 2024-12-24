import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Kiểm tra token trong localStorage
  const token = localStorage.getItem('token');
  
  // Nếu không có token, chuyển hướng về trang đăng nhập
  if (!token) {
    return <Navigate to="/home" replace />;
  }

  // Nếu có token, render component con
  return children;
};

export default ProtectedRoute; 