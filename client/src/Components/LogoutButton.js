import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { logoutUser } = useContext(UserContext);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    logoutUser();
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
