import {
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAIL,
} from '../../action/types';

const initialState = {
    loading: false,
    successMessage: '',
    error: null,
};

const adminRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.successMessage,
                error: null,
            };
        case REGISTER_ADMIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default adminRegisterReducer;
