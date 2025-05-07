import React, { createContext, useState } from 'react'

// Create the context
export const BrandContext = createContext();

// Create a provider component
export const BrandProvider = ({ children }) => {
    const [brandName, setBrandName] = useState('');
    // Define state for the 5 items
    const [currency, setCurrency] = useState('');

    return (
        <BrandContext.Provider value={{
            brandName, setBrandName,
            item1: currency, setCurrency,
        }}>
            {children}
        </BrandContext.Provider>
    );
};