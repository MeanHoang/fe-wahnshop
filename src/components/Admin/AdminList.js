import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminList.scss';

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [editedAdminId, setEditedAdminId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get(`http://localhost:3310/api/admin?page=${page}&limit=8&searchTerm=${searchTerm}`);
                setAdmins(response.data.admins);
                setTotal(response.data.total);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                toast.error('Failed to fetch admins');
            }
        };

        fetchAdmins();
    }, [page, searchTerm]);

    const handleDelete = async (adminId) => {
        const confirmDelete = window.confirm("Do you want to delete this admin?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3310/api/admin/profile`, { data: { id: adminId } });
                toast.success('Admin deleted successfully');
                setAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
            } catch (error) {
                toast.error('Failed to delete admin');
            }
        }
    };

    const handleToggleActive = async (adminId, isActive) => {
        const confirmToggle = window.confirm(`Do you want to ${isActive ? 'deactivate' : 'activate'} this admin?`);
        if (confirmToggle) {
            try {
                await axios.put(`http://localhost:3310/api/admin/profile`, { id: adminId, is_active: !isActive });
                toast.success(`Admin ${isActive ? 'deactivated' : 'activated'} successfully`);
                setAdmins((prev) =>
                    prev.map((admin) =>
                        admin.id === adminId ? { ...admin, is_active: !isActive } : admin
                    )
                );
            } catch (error) {
                toast.error('Failed to update admin status');
            }
        }
    };

    const handleEditClick = (adminId) => {
        setEditedAdminId(editedAdminId === adminId ? null : adminId); // Toggle editing
    };

    const handleInputChange = (e, adminId) => {
        const { name, value } = e.target;
        setAdmins((prev) =>
            prev.map((admin) => (admin.id === adminId ? { ...admin, [name]: value } : admin))
        );
    };

    const handleInputBlur = async (adminId) => {
        const adminToUpdate = admins.find((admin) => admin.id === adminId);
        try {
            await axios.put(`http://localhost:3310/api/admin/profile`, {
                id: adminId,
                username: adminToUpdate.username,
                fullname: adminToUpdate.fullname,
            });
            toast.success('Admin updated successfully');
        } catch (error) {
            toast.error('Failed to update admin');
        }
    };

    const handleResetPassword = async (adminId) => {
        const confirmReset = window.confirm("Do you want to reset the password for this admin?");
        if (confirmReset) {
            try {
                await axios.put(`http://localhost:3310/api/admin/reset-password`, { id: adminId });
                toast.success('Password reset successfully');
            } catch (error) {
                toast.error('Failed to reset password');
            }
        }
    };

    const filteredAdmins = admins.filter((admin) =>
        admin.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(total / 8);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="admin-list">
            <h2>Admin list</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Created at</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAdmins.map((admin) => (
                        <tr key={admin.id}>
                            <td>{admin.id}</td>
                            <td>
                                {editedAdminId === admin.id ? (
                                    <input
                                        type="text"
                                        name="username"
                                        value={admin.username}
                                        onChange={(e) => handleInputChange(e, admin.id)}
                                        onBlur={() => handleInputBlur(admin.id)}
                                    />
                                ) : (
                                    admin.username
                                )}
                            </td>
                            <td>
                                {editedAdminId === admin.id ? (
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={admin.fullname}
                                        onChange={(e) => handleInputChange(e, admin.id)}
                                        onBlur={() => handleInputBlur(admin.id)}
                                    />
                                ) : (
                                    admin.fullname
                                )}
                            </td>
                            <td>{admin.created_at}</td>
                            <td>{admin.is_active ? 'On' : 'Off'}</td>
                            <td>
                                <button className='edit-button' onClick={() => handleEditClick(admin.id)}>
                                    {editedAdminId === admin.id ? 'Save' : 'Edit'}
                                </button>
                                <button className='delete-button' onClick={() => handleDelete(admin.id)}>Delete</button>
                                <button className='toggle-button' onClick={() => handleToggleActive(admin.id, admin.is_active)}>
                                    {admin.is_active ? 'Deactivate' : 'Activate'}
                                </button>
                                <button className='reset-button' onClick={() => handleResetPassword(admin.id)}>Reset Password</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span> Page {page} of {totalPages} </span>
                <button onClick={() => setPage((prev) => (page < totalPages ? prev + 1 : prev))} disabled={page === totalPages}>
                    Next
                </button>
            </div>

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

export default AdminList;
