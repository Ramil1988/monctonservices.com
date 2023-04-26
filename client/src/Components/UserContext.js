import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [shouldFetchUser, setshouldFetchUser] = useState(true);

  useEffect(() => {
    const getCurrentUser = async (id) => {
      return await fetch(`/user/${id}`);
    };
    if (shouldFetchUser) {
      const storedUser =
        localStorage.getItem("user") !== "undefined"
          ? JSON.parse(localStorage.getItem("user"))
          : null;

      if (isAuthenticated && user) {
        getCurrentUser(user.sub)
          .then((res) => res.json())
          .then((customUser) => {
            if (customUser.data) {
              localStorage.setItem("user", JSON.stringify(customUser.data));
              setCurrentUser(customUser.data);
            } else {
              const userData = {
                userId: user.sub,
                name: user.given_name,
                nickname: user.nickname,
                email: user.email,
              };
              fetch("/user/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: userData }),
              })
                .then((response) => response.json())
                .then((data) => {
                  localStorage.setItem("user", JSON.stringify(data));
                  setCurrentUser(data);
                })
                .catch((error) => console.error("Error saving user:", error));
            }
          });

        setLoadingUser(false);
      } else if (storedUser) {
        setCurrentUser(storedUser);
        setLoadingUser(false);
      } else {
        setLoadingUser(false);
      }
      setshouldFetchUser(false);
    }
  }, [isAuthenticated, user, isLoading, shouldFetchUser]);

  const logoutUser = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {}, [isLoading]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        isLoading,
        loadingUser,
        logoutUser,
        logoutUser,
        setshouldFetchUser,
      }}
    >
      {!loadingUser && children}
    </UserContext.Provider>
  );
};

export default UserProvider;
