import { createContext, useContext, useState } from 'react';

const ToggleContext = createContext();

export const ToggleContextWrapper = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberModal, setMemberModal] = useState({ isOpen: false, addToGroup: 0 });

  const value = {
    isModalOpen,
    setIsModalOpen,
    memberModal,
    setMemberModal,
  };
  return <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>;
};

export const useToggleContext = () => {
  return useContext(ToggleContext);
};
