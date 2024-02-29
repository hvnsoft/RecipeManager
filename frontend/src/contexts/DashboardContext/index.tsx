import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DashboardContextProps {
    pageNumber: number;
    filterKeys: string[];
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    setFilterKeys: React.Dispatch<React.SetStateAction<string[]>>;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboardContext must be used within a DashboardProvider');
    }
    return context;
};

export const DashboardContextProvider: React.FC<{
    children: ReactNode
}> = ({ children }) => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [filterKeys, setFilterKeys] = useState<string[]>([]);

    return (
        <DashboardContext.Provider
            value={{ pageNumber, filterKeys, setPageNumber, setFilterKeys }}
        >
            {children}
        </DashboardContext.Provider>
    );
};