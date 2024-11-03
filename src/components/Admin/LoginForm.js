import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../redux/action/adminAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const { loading, error, token } = useSelector(state => state.adminLogin);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        // If login is successful (token exists), show success message and navigate
        if (token) {
            toast.success('Login successful!');
            navigate('/dashboard'); // Redirect to Dashboard
        }
        // If there's an error, display the error message
        if (error) {
            toast.error(error);
        }
    }, [token, error, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAdmin(formData)); // Call login action with form data
    };

    return (
        <div className="login-form">
            <h2>Admin Login</h2>
            {loading && <p>Loading...</p>} {/* Show loading when logging in */}
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
                <button type="submit" disabled={loading}>Login</button> {/* Disable button when loading */}
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
