import axios from 'axios';

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';

export const fetchTasks = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_TASKS_REQUEST });
    try {
        const response = await axios.get(`/api/tasks/${userId}`);
        dispatch({ type: FETCH_TASKS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
    }
};

export const addTask = (task) => async (dispatch) => {
    try {
        const response = await axios.post('/api/tasks', task);
        dispatch({ type: ADD_TASK_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ADD_TASK_FAILURE, payload: error.message });
    }
};

export const updateTask = (task) => async (dispatch) => {
    try {
        const response = await axios.put('/api/tasks', task);
        dispatch({ type: UPDATE_TASK_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_TASK_FAILURE, payload: error.message });
    }
};
