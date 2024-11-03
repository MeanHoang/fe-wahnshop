import {
    REGISTER_ADMIN_REQUEST,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FETCH_ADMINS_REQUEST,
    FETCH_ADMINS_SUCCESS,
    FETCH_ADMINS_FAIL,
    DELETE_ADMIN_SUCCESS,
    TOGGLE_ADMIN_STATUS_SUCCESS,
    UPDATE_ADMIN_SUCCESS,
    UPDATE_ADMIN_FAIL
} from './types.js';
import { registerAdminAPI, loginAdminAPI } from '../../api/adminAPI';
import axios from 'axios';
import { toast } from 'react-toastify';

// Đăng ký admin
export const registerAdmin = (formData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_ADMIN_REQUEST });
        const response = await registerAdminAPI(formData);
        const { token, message } = response.data;
        dispatch({ type: REGISTER_ADMIN_SUCCESS, payload: { token, successMessage: message } });
    } catch (error) {
        dispatch({ type: REGISTER_ADMIN_FAIL, payload: error.response.data.message });
        toast.error('Registration failed: ' + error.response.data.message);
    }
};

// Đăng nhập admin
export const loginAdmin = (credentials) => async (dispatch) => {
    try {
        const response = await loginAdminAPI(credentials);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        });
        toast.error('Login failed: ' + error.response.data.message);
    }
};

// Lấy danh sách admin
export const fetchAdmins = (page, searchTerm) => async (dispatch) => {
    dispatch({ type: FETCH_ADMINS_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3310/api/admin?page=${page}&limit=8&searchTerm=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: FETCH_ADMINS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ADMINS_FAIL, payload: error.response?.data?.message || error.message });
        toast.error('Failed to fetch admins: ' + (error.response?.data?.message || error.message));
    }
};

// Xóa admin
export const deleteAdmin = (adminId) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:3310/api/admin/profile`, { data: { id: adminId } });
        dispatch({ type: DELETE_ADMIN_SUCCESS, payload: adminId });
        toast.success('Admin deleted successfully');
    } catch (error) {
        toast.error('Failed to delete admin: ' + (error.response?.data?.message || error.message));
    }
};

// Cập nhật trạng thái admin
export const updateAdminStatus = (adminId, isActive) => async (dispatch) => {
    try {
        await axios.put(`http://localhost:3310/api/admin/profile`, { id: adminId, is_active: isActive });
        dispatch({ type: TOGGLE_ADMIN_STATUS_SUCCESS, payload: { id: adminId, is_active: isActive } });
        toast.success(`Admin ${isActive ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
        toast.error('Failed to update admin status: ' + (error.response?.data?.message || error.message));
    }
};

// Cập nhật admin
export const updateAdmin = (adminId, name, value) => async (dispatch) => {
    try {
        await axios.put(`http://localhost:3310/api/admin/profile`, { id: adminId, [name]: value });
        dispatch({ type: UPDATE_ADMIN_SUCCESS, payload: { id: adminId, [name]: value } });
        toast.success('Admin updated successfully');
    } catch (error) {
        dispatch({ type: UPDATE_ADMIN_FAIL, payload: error.response?.data?.message || error.message });
        toast.error('Failed to update admin: ' + (error.response?.data?.message || error.message));
    }
};
