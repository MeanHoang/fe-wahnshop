// adminRegisterReducer.js

const initialRegisterState = {
    loading: false,
    isRegistered: false,
    successMessage: null,
    error: null,
};

export const adminRegisterReducer = (state = initialRegisterState, action) => {
    switch (action.type) {
        case 'REGISTER_REQUEST':
            return { ...state, loading: true, error: null };
        case 'REGISTER_SUCCESS':
            return { ...state, loading: false, isRegistered: true, successMessage: action.payload, error: null }; // Đăng ký thành công
        case 'REGISTER_FAILURE':
            return { ...state, loading: false, isRegistered: false, error: action.payload };
        default:
            return state;
    }
};
