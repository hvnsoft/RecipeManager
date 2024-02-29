import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MainContextProps {
    searchKey: string;
    setSearchKey: React.Dispatch<React.SetStateAction<string>>;
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const useMainContext = () => {
    const context = useContext(MainContext);
    if (!context) {
        throw new Error('useMainContext must be used within a MainProvider');
    }
    return context;
};

export const MainContextProvider: React.FC<{
    children: ReactNode
}> = ({ children }) => {
    const [searchKey, setSearchKey] = useState<string>('');

    return (
        <MainContext.Provider
            value={{ searchKey, setSearchKey }}
        >
            {children}
        </MainContext.Provider>
    );
};
