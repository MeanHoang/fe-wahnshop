import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from '../../action/types';

const initialState = {
    loading: false,
    successMessage: '',
    error: '',
};

const userRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return { ...state, loading: true, error: '' };
        case REGISTER_USER_SUCCESS:
            return { ...state, loading: false, successMessage: 'User added successfully!' };
        case REGISTER_USER_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default userRegisterReducer;
