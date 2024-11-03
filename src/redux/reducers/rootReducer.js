import { combineReducers } from 'redux';
import adminLoginReducer from './admin/adminLoginReducer';
import adminRegisterReducer from './admin/adminRegisterReducer';
import adminReducer from './admin/adminReducer';
import userRegisterReducer from './user/userReducer';

const rootReducer = combineReducers({
    adminLogin: adminLoginReducer,
    adminRegister: adminRegisterReducer,
    adminList: adminReducer,
    userRegister: userRegisterReducer,
});

export default rootReducer;
