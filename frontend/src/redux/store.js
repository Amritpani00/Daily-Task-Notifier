import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import taskReducer from './reducers/taskReducer';
import analyticsReducer from './reducers/analyticsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer,
    analytics: analyticsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
