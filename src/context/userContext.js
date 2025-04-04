import { createContext, useContext } from 'react';

const MyUserContext = createContext(1);

export const MyUserContextProvider = ({ children, userId }) => {
  return (
    <MyUserContext.Provider value={userId}>{children}</MyUserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(MyUserContext);
};
