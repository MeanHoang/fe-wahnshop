const initialLoginState = {
    loading: false,
    isLoggedIn: false,
    token: null, // Thêm token vào state
    successMessage: null,
    error: null,
};

export const adminLoginReducer = (state = initialLoginState, action) => {
    console.log('Current State:', state);
    console.log('Received Action:', action);

    switch (action.type) {
        case 'LOGIN_REQUEST':
            console.log('Processing Login Request');
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            console.log('Login Successful', action.payload);
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                token: action.payload.token, // Lưu trữ token
                successMessage: action.payload.message, // Có thể thêm message nếu cần
                error: null
            };
        case 'LOGIN_FAILURE':
            console.log('Login Failed', action.payload);
            return { ...state, loading: false, isLoggedIn: false, error: action.payload };
        default:
            return state;
    }
};
