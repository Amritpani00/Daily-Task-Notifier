import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const login = (username, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post('/api/authenticate', { username, password });
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

export const register = (username, password) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const response = await axios.post('/api/register', { username, password });
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
    }
};
