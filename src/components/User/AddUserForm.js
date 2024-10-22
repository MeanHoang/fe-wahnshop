import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAdmin } from '../../redux/action/adminAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddUserForm.scss';

const AddUserForm = () => {
    const dispatch = useDispatch();
    const { loading, successMessage, error } = useSelector(state => state.adminRegister);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullname: '',
    });

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
        }
        if (error) {
            toast.error(error);
        }
    }, [successMessage, error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerAdmin(formData));
    };

    return (
        <div className="add-admin-form">
            <h2>ADD NEW ADMIN</h2>
            {loading && <p>Loading...</p>}
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
                <label>Fullname</label>
                <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add</button>
            </form>


            <ToastContainer
                position="top-right"
                autoClose={1000}
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

export default AddUserForm;
