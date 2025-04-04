import { createContext, useContext } from 'react';

const MyUserContext = createContext();

export const MyUserContextProvider = ({ children, userId }) => {
  return (
    <MyUserContext.Provider value={userId}>
      {console.log('Provider value:', userId)}
      {children}
    </MyUserContext.Provider>
  );
};

export const useUser = () => useContext(MyUserContext);
