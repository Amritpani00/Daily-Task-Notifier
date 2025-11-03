import { FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE } from './taskActions';

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_TASKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        case ADD_TASK_FAILURE:
        case UPDATE_TASK_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default taskReducer;
