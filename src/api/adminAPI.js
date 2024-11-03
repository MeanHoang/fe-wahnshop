import axios from 'axios';

// Thiết lập instance của axios với cấu hình cơ bản
const apiClient = axios.create({
    baseURL: 'http://localhost:3310/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Hàm đăng ký admin
export const registerAdminAPI = async (formData) => {
    const response = await apiClient.post('/admin/register', formData);
    return response;
};

// Hàm đăng nhập admin
export const loginAdminAPI = async (credentials) => {
    const response = await apiClient.post('/admin/login', credentials);
    return response;
};

// Hàm lấy danh sách admin
export const getAllAdminsAPI = async () => {
    const response = await apiClient.get('/admin/all');
    return response;
};

// Bạn có thể thêm các hàm khác để tương tác với API nếu cần
