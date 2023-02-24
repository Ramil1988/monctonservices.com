import { useState, createContext } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export default UserProvider;
