import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/action/userAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddUserForm.scss';

const AddUserForm = () => {
    const dispatch = useDispatch();
    const { loading, successMessage, error } = useSelector(state => state.userRegister);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phonenumber: '',
        fullname: '',
        sex: true,
        birthday: '',
        height: '',
        weight: '',
    });

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            setFormData({
                email: '',
                password: '',
                phonenumber: '',
                fullname: '',
                sex: true,
                birthday: '',
                height: '',
                weight: '',
            });
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
        dispatch(registerUser(formData));
    };

    return (
        <div className="add-user-form">
            <h2>Add New User</h2>
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <div className="input-group">
                    <div className="input-field">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phonenumber"
                            value={formData.phonenumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <label>Full Name</label>
                <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                />

                <div className="input-group">
                    <div className="input-field">
                        <label>Sex</label>
                        <select name="sex" value={formData.sex} onChange={handleChange} className="select-field">
                            <option value={true}>Male</option>
                            <option value={false}>Female</option>
                        </select>
                    </div>
                    <div className="input-field">
                        <label>Birthday</label>
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-field">
                        <label>Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label>Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button type="submit">Add User</button>
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
