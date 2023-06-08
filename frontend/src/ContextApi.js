import { createContext, useState } from 'react';

const DataContext = createContext();

const ContextApi = ({ children }) => {
  const [userData, setUserData] = useState({});

  return (
    <DataContext.Provider value={{ userData, setUserData }}>
      {children}
    </DataContext.Provider>
  );
};

export { ContextApi, DataContext };
