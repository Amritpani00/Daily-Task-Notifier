import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Snackbar } from '@mui/material';

const Notification = () => {
    const [notification, setNotification] = useState(null);
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            const socket = new SockJS('/api/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, () => {
                stompClient.subscribe(`/topic/reminders/${user.id}`, (message) => {
                    setNotification(message.body);
                });
            });
        }
    }, [isAuthenticated, user]);

    const handleClose = () => {
        setNotification(null);
    };

    return (
        <Snackbar
            open={!!notification}
            autoHideDuration={6000}
            onClose={handleClose}
            message={notification}
        />
    );
};

export default Notification;
