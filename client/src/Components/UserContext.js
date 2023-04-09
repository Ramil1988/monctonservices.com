import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (isAuthenticated && user) {
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      setLoadingUser(false);
    } else if (storedUser) {
      setCurrentUser(storedUser);
      setLoadingUser(false);
    } else {
      setLoadingUser(false);
    }
  }, [isAuthenticated, user]);

  const logoutUser = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        loadingUser,
        logoutUser,
        logoutUser,
      }}
    >
      {!loadingUser && children}
    </UserContext.Provider>
  );
};

export default UserProvider;
