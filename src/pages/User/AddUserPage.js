import React from 'react';
import AddUserForm from '../../components/User/AddUserForm';
import Navbar from '../../components/Admin/Navbar';
import './AddUserPage.scss';

const AddUserPage = () => {
    return (
        <div className="admin-page">
            <Navbar />
            <div className="content">
                <AddUserForm />
            </div>
        </div>
    );
};

export default AddUserPage;
