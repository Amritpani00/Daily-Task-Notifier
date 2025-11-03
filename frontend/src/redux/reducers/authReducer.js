import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/authActions';
import jwt_decode from 'jwt-decode';

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
    error: null,
    loading: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            const user = jwt_decode(action.payload);
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
                user: user,
                error: null,
                loading: false,
            };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default authReducer;
