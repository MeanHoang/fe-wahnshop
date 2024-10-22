import axios from 'axios';

const API_URL = 'http://localhost:3310/api/admin';

export const registerAdminAPI = async (adminData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, adminData);
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
};
