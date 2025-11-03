import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask } from '../redux/actions/taskActions';
import { TextField, Button, Container, Typography, List, ListItem, ListItemText, Checkbox, CircularProgress, Alert } from '@mui/material';
import { Redirect } from 'react-router-dom';

const TaskPage = () => {
    const [task, setTask] = useState('');
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks);
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchTasks(user.id));
        }
    }, [dispatch, isAuthenticated, user]);

    const handleAddTask = () => {
        dispatch(addTask({ description: task, completed: false, userId: user.id }));
        setTask('');
    };

    const handleToggleComplete = (task) => {
        dispatch(updateTask({ ...task, completed: !task.completed }));
    };

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                My Tasks
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="New Task"
                fullWidth
                margin="normal"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddTask}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Add Task'}
            </Button>
            <List>
                {tasks.map((task) => (
                    <ListItem key={task.id}>
                        <Checkbox
                            checked={task.completed}
                            onChange={() => handleToggleComplete(task)}
                        />
                        <ListItemText primary={task.description} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default TaskPage;
