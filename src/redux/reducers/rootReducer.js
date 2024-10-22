import { combineReducers } from 'redux';
import { adminRegisterReducer } from './admin/adminRegisterReducer';
import { adminLoginReducer } from './admin/adminLoginReducer';

const rootReducer = combineReducers({
    adminRegister: adminRegisterReducer,
    adminLogin: adminLoginReducer,
});

export default rootReducer;
