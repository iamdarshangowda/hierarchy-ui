import { createContext, useContext, useState } from 'react';

const ToggleContext = createContext();

export const ToggleContextWrapper = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const value = {
    isModalOpen,
    setIsModalOpen,
  };
  return <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>;
};

export const useToggleContext = () => {
  return useContext(ToggleContext);
};
