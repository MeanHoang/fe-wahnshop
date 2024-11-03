import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserList.scss';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3310/api/user?page=${page}&limit=8&searchTerm=${searchTerm}`);
                setUsers(response.data.users);
                setTotal(response.data.total);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                toast.error('Failed to fetch users');
            }
        };
        fetchUsers();
    }, [page, searchTerm]);

    const handleToggleActive = async (userId, isActive) => {
        const confirmToggle = window.confirm(`Do you want to ${isActive ? 'deactivate' : 'activate'} this user?`);
        if (confirmToggle) {
            try {
                await axios.put(`http://localhost:3310/api/user/profile`, { id: userId, is_active: !isActive });
                toast.success(`User ${isActive ? 'deactivated' : 'activated'} successfully`);
                setUsers((prev) =>
                    prev.map((user) =>
                        user.id === userId ? { ...user, is_active: !isActive } : user
                    )
                );
            } catch (error) {
                toast.error('Failed to update user status');
            }
        }
    };

    const handleReset = (userId) => {
        const confirmReset = window.confirm("Are you sure you want to reset this user's information?");
        if (confirmReset) {
            const userToReset = users.find((user) => user.id === userId);
            setUsers((prev) =>
                prev.map((user) => (user.id === userId ? { ...user, email: userToReset.email, phonenumber: userToReset.phonenumber, fullname: userToReset.fullname, sex: userToReset.sex, birthday: userToReset.birthday, height: userToReset.height, weight: userToReset.weight } : user))
            );
            toast.success('User information reset successfully');
        }
    };

    const filteredUsers = users.filter((user) =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(total / 8);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-list">
            <h2>User List</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by fullname"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Phonenumber</th>
                        <th>Full Name</th>
                        <th>Sex</th>
                        <th>Birthday</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Active Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.phonenumber}</td>
                            <td>{user.fullname}</td>
                            <td>{user.sex}</td>
                            <td>{user.birthday}</td>
                            <td>{user.height}</td>
                            <td>{user.weight}</td>
                            <td>{user.is_active ? 'Active' : 'Inactive'}</td>
                            <td>
                                <button className='reset-button' onClick={() => handleReset(user.id)}>
                                    Reset
                                </button>
                                <button className='toggle-button' onClick={() => handleToggleActive(user.id, user.is_active)}>
                                    {user.is_active ? 'Deactivate' : 'Activate'}
                                </button>
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

export default UserList;
