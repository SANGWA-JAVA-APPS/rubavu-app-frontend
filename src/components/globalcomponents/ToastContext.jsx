import React, { createContext, useEffect, useState } from 'react'
import { Button, Toast, ToastContainer } from 'react-bootstrap';

export const ToastContext = createContext();
export const ToastDialogProvider = ({ children }) => {
    const [toast, setToast] = useState({ show: false, message: "", variant: "danger" });

    const showToast = (message, variant = "danger") => {
        setToast({ show: true, message, variant });
        setTimeout(() => setToast({ show: false, message: "", variant }), 12000); // Auto-hide
    };
    // useEffect(() => {
    //     if (toast.show) {
    //         const timer = setTimeout(() => setShow(false), 6000);  // Hide after 3s
    //         return () => clearTimeout(timer);
    //     }
    // }, [toast.show]);
    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="p-3">
                <ToastContainer   className="p-3">
                    <Toast style={{
                        position: 'fixed',   // Fixed position
                        top: '20px',         // Adjust top position (can change)
                        right: '20px',       // Adjust right position (can change)
                        zIndex: 9999         // Make sure it's above other elements
                    }}
                        bg="danger" delay={20000} autohide
                        show={toast.show} onClose={() => setToast({ ...toast, show: false })}>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Info</strong>
                            <small>Just now</small>
                        </Toast.Header>
                        <Toast.Body className="text-white">{toast.message} </Toast.Body>
                    </Toast>

                </ToastContainer>
            </div>
        </ToastContext.Provider>
    )
}
