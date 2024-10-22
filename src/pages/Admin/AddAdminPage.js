import React from 'react';
import AddAdminForm from '../../components/Admin/AddAdminForm';
import Navbar from '../../components/Admin/Navbar';
import './AddAdminPage.scss';

const AddAdminPage = () => {
    return (
        <div className="admin-page">
            <Navbar />
            <div className="content">
                <AddAdminForm />
            </div>
        </div>
    );
};

export default AddAdminPage;
