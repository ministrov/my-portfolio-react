import { Children, createContext } from 'react';

const MyUserContext = createContext(null);

console.log(Children);

export const MyUserContextProvider = ({ children, userId }) => {
  return (
    <MyUserContext.Provider value={userId}>{children}</MyUserContext.Provider>
  );
};
