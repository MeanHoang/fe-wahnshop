import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from '../../action/types';

const initialState = {
    loading: false,
    token: null,
    error: null,
};

const adminLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                error: null,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default adminLoginReducer;
