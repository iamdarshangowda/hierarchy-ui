import { createContext, useContext, useState } from 'react';

const EmployeeContext = createContext();

export const EmployeeContextWrapper = ({ children }) => {
  const [editingMemberId, setEditingMemberId] = useState(0);

  const value = {
    editingMemberId,
    setEditingMemberId,
  };
  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
};

export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};
