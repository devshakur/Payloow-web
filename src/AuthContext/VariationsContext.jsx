import React, { createContext, useContext, useState } from 'react';

const VariationsContext = createContext();

export const VariationsProvider = ({ children }) => {
    const [variations, setVariations] = useState([]);

    return (
        <VariationsContext.Provider value={{ variations, setVariations }}>
            {children}
        </VariationsContext.Provider>
    );
};

export const useVariation = () => {
    const context = useContext(VariationsContext);
    if (!context) {
        throw new Error('useVariation must be used within a VariationsProvider');
    }
    return context;
};
