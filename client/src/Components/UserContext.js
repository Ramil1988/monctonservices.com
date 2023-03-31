import { useState, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <UserContext.Provider value={{ user, isAuthenticated, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
