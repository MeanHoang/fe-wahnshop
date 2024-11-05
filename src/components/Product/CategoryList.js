import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CategoryList.scss';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3310/api/category');
                setCategories(response.data);
                console.log('Categories retrieved:', response.data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching categories:', err);
                toast.error('Could not fetch categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (categoryId) => {
        const confirmDelete = window.confirm("Do you want to delete this category?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3310/api/category/detail`, { data: { id: categoryId } });
                toast.success('Category deleted successfully');
                setCategories(prev => prev.filter(category => category.id !== categoryId));
            } catch (error) {
                toast.error('Failed to delete category');
            }
        }
    };

    const handleEdit = async (categoryId, name, description) => {
        try {
            await axios.put(`http://localhost:3310/api/category/detail`, { id: categoryId, name, description });
            toast.success('Category updated successfully');
            // Cập nhật danh sách categories
            setCategories(prev =>
                prev.map(category => category.id === categoryId ? { ...category, name, description } : category)
            );
        } catch (error) {
            toast.error('Failed to update category');
        }
    };

    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    const handleEditClick = (category) => {
        setEditCategoryId(category.id);
        setEditedName(category.name);
        setEditedDescription(category.description);
    };

    const handleSaveClick = () => {
        handleEdit(editCategoryId, editedName, editedDescription);
        setEditCategoryId(null);
        setEditedName('');
        setEditedDescription('');
    };

    const [showFullDescription, setShowFullDescription] = useState(null);

    const toggleDescription = (categoryId) => {
        setShowFullDescription(showFullDescription === categoryId ? null : categoryId);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="category-list">
            <h2>Category List</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by category name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories
                            .filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>
                                        {editCategoryId === category.id ? (
                                            <input
                                                type="text"
                                                value={editedName}
                                                onChange={(e) => setEditedName(e.target.value)}
                                            />
                                        ) : (
                                            category.name
                                        )}
                                    </td>
                                    <td>
                                        {editCategoryId === category.id ? (
                                            <textarea
                                                value={editedDescription}
                                                onChange={(e) => setEditedDescription(e.target.value)}
                                                style={{ width: '100%', resize: 'none' }}
                                            />
                                        ) : (
                                            <>
                                                <span>
                                                    {showFullDescription === category.id
                                                        ? category.description
                                                        : category.description.length > 50
                                                            ? category.description.substring(0, 50) + '...'
                                                            : category.description}
                                                </span>
                                                {category.description.length > 50 && (
                                                    <button onClick={() => toggleDescription(category.id)}>
                                                        {showFullDescription === category.id ? 'Show Less' : 'Show More'}
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                    <td>{new Date(category.created_at).toLocaleDateString()}</td>
                                    <td>
                                        {editCategoryId === category.id ? (
                                            <button onClick={handleSaveClick} className='edit-button'>Save</button>
                                        ) : (
                                            <button onClick={() => handleEditClick(category)} className='edit-button'>Edit</button>
                                        )}
                                        <button className='delete-button' onClick={() => handleDelete(category.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="5">No categories found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

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

export default CategoryList;
