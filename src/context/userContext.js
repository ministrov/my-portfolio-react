import { createContext, useContext } from 'react';

const user = 2;

const MyUserContext = createContext(user);

export const MyUserContextProvider = ({ children, userId }) => {
  return (
    <MyUserContext.Provider value={userId}>
      {console.log('Provider value:', userId)}
      {children}
    </MyUserContext.Provider>
  );
};

export const useUser = () => useContext(MyUserContext);
