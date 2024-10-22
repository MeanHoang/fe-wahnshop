// adminAction.js

import axios from 'axios';

// Địa chỉ API backend
const API_URL = 'http://localhost:3310/api/admin';

// Đăng ký admin
export const registerAdmin = (adminData) => async (dispatch) => {
    dispatch({ type: 'REGISTER_REQUEST' }); // Dispatch action yêu cầu đăng ký

    try {
        const response = await axios.post(`${API_URL}/register`, adminData);
        console.log(">>> check res: ", response.data);
        dispatch({ type: 'REGISTER_SUCCESS', payload: response.data.message }); // Dispatch khi thành công
    } catch (error) {
        console.log(">>> check res: ", error.response.data);
        dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data.message || error.message }); // Dispatch khi lỗi
    }
};

// Đăng nhập admin
export const loginAdmin = (loginData) => async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' }); // Dispatch action yêu cầu đăng nhập

    try {
        const response = await axios.post(`${API_URL}/login`, loginData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token: response.data.token, message: 'Login successful!' } });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message || error.message }); // Dispatch khi lỗi
    }
};

//Delete Admin
export const deleteAdmin = (adminId) => async (dispatch) => {
    dispatch({ type: 'DELETE_ADMIN_REQUEST' }); // Dispatch action yêu cầu xóa admin

    try {
        await axios.delete(`${API_URL}/profile`, { data: { id: adminId } });
        dispatch({ type: 'DELETE_ADMIN_SUCCESS', payload: adminId }); // Dispatch khi thành công
    } catch (error) {
        dispatch({ type: 'DELETE_ADMIN_FAILURE', payload: error.response.data.message || error.message }); // Dispatch khi lỗi
    }
};

// Cập nhật admin
export const updateAdmin = (adminData) => async (dispatch) => {
    dispatch({ type: 'UPDATE_ADMIN_REQUEST' }); // Dispatch action yêu cầu cập nhật admin

    try {
        const response = await axios.put(`${API_URL}/profile`, adminData);
        dispatch({ type: 'UPDATE_ADMIN_SUCCESS', payload: response.data }); // Dispatch khi thành công
    } catch (error) {
        dispatch({ type: 'UPDATE_ADMIN_FAILURE', payload: error.response.data.message || error.message }); // Dispatch khi lỗi
    }
};

// Tìm kiếm admin
export const searchAdmin = (partialUsername, page, limit) => async (dispatch) => {
    dispatch({ type: 'SEARCH_ADMIN_REQUEST' });

    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: { username: partialUsername, page, limit },
        });
        dispatch({ type: 'SEARCH_ADMIN_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'SEARCH_ADMIN_FAILURE', payload: error.response.data.message || error.message });
    }
};
