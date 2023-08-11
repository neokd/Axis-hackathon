import React, { useState, useEffect } from 'react';

const Notifications = ({ type, message }) => {
    const [notificationVisible, setNotificationVisible] = useState(true);

    let bgColorClass = '';
    switch (type) {
        case 'success':
            bgColorClass = 'bg-green-400';
            break;
        case 'error':
            bgColorClass = 'bg-red-400';
            break;
        case 'warning':
            bgColorClass = 'bg-yellow-400';
            break;
        default:
            bgColorClass = '';
    }

    useEffect(() => {
        if (message) {
            const timeoutId = setTimeout(() => {
                setNotificationVisible(false);
            }, 5000); 

            return () => clearTimeout(timeoutId);
        }
    }, [message]);

    const handleClose = () => {
        setNotificationVisible(false);
    };

    return (
        <>
            {notificationVisible && message && (
                <div className={`fixed top-12 right-0 p-4 mt-8 mr-8 z-50 ${bgColorClass} text-white rounded-md shadow-md`}>
                    <p>{message}</p>
                    <button className="absolute top-2 right-2 text-white hover:text-gray-300" onClick={handleClose}>
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6.94 6.94a1 1 0 1 0-1.414 1.414L9.586 10l-4.06 4.06a1 1 0 1 0 1.414 1.414L11 11.414l4.06 4.06a1 1 0 1 0 1.414-1.414L12.414 10l4.06-4.06a1 1 0 0 0-1.414-1.414L11 8.586 6.94 4.525z"/></svg>
                    </button>
                </div>
            )}
        </>
    );
};

export default Notifications;
