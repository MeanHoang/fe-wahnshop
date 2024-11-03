// src/redux/action/userAction.js

import axios from 'axios';
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL
} from './types';

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const response = await axios.post('http://localhost:3310/api/user/register', userData);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response ? error.response.data : 'Error occurred',
        });
    }
};
