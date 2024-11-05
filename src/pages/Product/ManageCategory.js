import React, { useState } from 'react';
import CategoryList from '../../components/Product/CategoryList';
import Navbar from '../../components/Admin/Navbar';
import './ManageCategory.scss';

const ManageCategory = () => {
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddCategory = async () => {
        if (newCategory.name && newCategory.description) {
            try {
                const response = await fetch('http://localhost:3310/api/category/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCategory),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Category added:', data);
                    // Cập nhật danh sách category mới
                    setNewCategory({ name: '', description: '' });
                    // Gọi hàm để refresh danh sách danh mục, ví dụ có thể pass vào props
                } else {
                    console.error('Failed to add category');
                }
            } catch (error) {
                console.error('Error adding category:', error);
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="category-page">
            <Navbar />
            <div className="content">
                <div className="add-category-form">
                    <input
                        type="text"
                        name="name"
                        value={newCategory.name}
                        onChange={handleInputChange}
                        placeholder="Category Name"
                        className="category-input"
                    />
                    <textarea
                        name="description"
                        value={newCategory.description}
                        onChange={handleInputChange}
                        placeholder="Category Description"
                        className="category-textarea"
                    />
                    <button onClick={handleAddCategory} className="add-button">
                        Add Category
                    </button>
                </div>
                <div className="category-list">
                    <CategoryList />
                </div>
            </div>
        </div>
    );
};

export default ManageCategory;
