import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../redux/action/adminAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const { loading, error, token } = useSelector(state => state.adminLogin);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        // Nếu đăng nhập thành công (có token), thông báo và chuyển hướng
        if (token) {
            toast.success('Login successful!');
            navigate('/dashboard'); // Chuyển đến trang Dashboard
        }
        // Nếu có lỗi, hiển thị thông báo lỗi
        if (error) {
            toast.error(error);
        }
    }, [token, error, navigate]); // Thêm navigate vào dependencies để tránh warning

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAdmin(formData)); // Gọi action đăng nhập với dữ liệu từ form
    };

    return (
        <div className="login-form">
            <h2>Admin Login</h2>
            {loading && <p>Loading...</p>} {/* Hiển thị loading khi đang đăng nhập */}
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default LoginForm;
