import axios from 'axios';

export const FETCH_ANALYTICS_REQUEST = 'FETCH_ANALYTICS_REQUEST';
export const FETCH_ANALYTICS_SUCCESS = 'FETCH_ANALYTICS_SUCCESS';
export const FETCH_ANALYTICS_FAILURE = 'FETCH_ANALYTICS_FAILURE';

export const fetchAnalytics = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_ANALYTICS_REQUEST });
    try {
        const response = await axios.get(`/api/analytics?userId=${userId}`);
        dispatch({ type: FETCH_ANALYTICS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ANALYTICS_FAILURE, payload: error.message });
    }
};
