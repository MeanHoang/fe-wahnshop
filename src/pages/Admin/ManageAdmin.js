import React from 'react';
import AdminList from '../../components/Admin/AdminList';
import Navbar from '../../components/Admin/Navbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ManageAdmin.scss';

const ManageAdmin = () => {
    const navigate = useNavigate(); // Khởi tạo navigate

    const handleAddAdmin = () => {
        navigate('/admin/add'); // Chuyển hướng đến trang thêm admin
    };

    return (
        <div className="admin-page">
            <Navbar />
            <div className="content">
                <button onClick={handleAddAdmin} className="add-admin-button">
                    Add New Admin
                </button>
                <div className="admin-list">
                    <AdminList />
                </div>

            </div>
        </div>
    );
};

export default ManageAdmin;