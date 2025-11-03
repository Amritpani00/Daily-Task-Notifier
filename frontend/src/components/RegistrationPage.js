import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { TextField, Button, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleRegister = () => {
        dispatch(register(username, password));
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" gutterBottom>
                Register
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegister}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
            <Typography variant="body2" style={{ marginTop: '1rem' }}>
                Already have an account? <Link to="/login">Login</Link>
            </Typography>
        </Container>
    );
};

export default RegistrationPage;
