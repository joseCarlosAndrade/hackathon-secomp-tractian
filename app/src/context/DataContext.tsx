// DataContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type of data you want to store in context
interface DataContextType {
  responseData: any; // Define the type based on your response structure
  setResponseData: (data: any) => void;
}

// Create context with a default empty value
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [responseData, setResponseData] = useState<any>([]); // Manage the shared data state

  return (
    <DataContext.Provider value={{ responseData, setResponseData }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use context
export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
