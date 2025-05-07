import React, { createContext, useState } from 'react'

// Create the context
export const StockOrBisnessContext = createContext();

// Create a provider component
export const StockOrBisnessProvider = ({ children }) => {
    const [bizType, setBizType] = useState('');
    // Define state for the 5 items
    const [currency, setCurrency] = useState('');

    return (
        <StockOrBisnessContext.Provider value={{
            bizType,  setBizType,
            
        }}>
            {children}
        </StockOrBisnessContext.Provider>
    );
};