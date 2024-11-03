// src/redux/reducers/adminReducer.js
const initialState = {
    admins: [],
    loading: false,
    error: null,
    total: 0,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ADMINS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_ADMINS_SUCCESS':
            return {
                ...state,
                loading: false,
                admins: action.payload.admins,
                total: action.payload.total,
            };
        case 'FETCH_ADMINS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        // Các trường hợp khác có thể thêm vào đây
        default:
            return state;
    }
};

export default adminReducer;
