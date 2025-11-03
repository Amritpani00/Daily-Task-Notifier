import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalytics } from '../redux/actions/analyticsActions';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { Redirect } from 'react-router-dom';

const AnalyticsPage = () => {
    const dispatch = useDispatch();
    const { analytics, loading, error } = useSelector((state) => state.analytics);
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchAnalytics(user.id));
        }
    }, [dispatch, isAuthenticated, user]);

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                My Analytics
            </Typography>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {analytics && (
                <div>
                    {/* Analytics data will be displayed here */}
                    <Typography variant="h6">
                        Task Completion Rate: {analytics.completionRate}%
                    </Typography>
                </div>
            )}
        </Container>
    );
};

export default AnalyticsPage;
