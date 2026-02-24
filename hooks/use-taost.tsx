'use client';

import { toast, ToastOptions } from 'react-hot-toast';

const useNotification = () => {
    const commonOptions: ToastOptions = {
        position: 'top-right',
        style: {
            borderRadius: '8px',
            padding: '12px 16px',
            fontWeight: 500,
            fontSize: '0.95rem',
            minWidth: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
    };

    const notifySuccess = (message: string) => {
        toast.custom((t) => (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } bg-green-100 text-green-700 p-3 rounded shadow flex items-center`}
                style={{
                    borderRadius: '10px',
                    background: '#f6ffed',
                    color: '#52c41a',
                    padding: '12px 16px',
                }}
            >
                {message}
            </div>
        ));
    };

    const notifyError = (message: string) => {
        toast.custom((t) => (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } flex justify-center items-center bg-card text-red-600 p-3 rounded-md border border-card-border shadow`}
                style={{
                    background: '#101218',
                    color: '#ff4d4f',
                    width: 350,
                    padding: '12px 16px',
                }}
            >
                {message || 'Une erreur est survenue'}
            </div>
        ));
    };

    const notifyInfo = (message: string) => {
        toast.custom((t) => (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } bg-yellow-100 text-yellow-800 p-3 rounded shadow flex items-center`}
                style={{
                    borderRadius: '8px',
                    background: '#faedcd',
                    color: '#f59e0b',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: '12px 16px',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    minWidth: '300px',
                }}
            >
                {message}
            </div>
        ));
    };

    return { notifySuccess, notifyError, notifyInfo };
};

export default useNotification;
