import React from 'react';
import UserList from '../../components/User/UserList';
import Navbar from '../../components/Admin/Navbar';
import { useNavigate } from 'react-router-dom';
import './ManageUser.scss';

const ManageUser = () => {
    const navigate = useNavigate();

    const handleAddUser = () => {
        navigate('/user/add');
    };

    return (
        <div className="user-page">
            <Navbar />
            <div className="content">
                <button onClick={handleAddUser} className="add-user-button">
                    Add New User
                </button>
                <div className="user-list">
                    <UserList />
                </div>

            </div>
        </div>
    );
};

export default ManageUser;
