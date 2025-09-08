import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserProvider from "./Components/UserContext";

const rootElement = document.getElementById("root");

// Ensure a default theme is applied before initial render
try {
  const stored = localStorage.getItem("theme");
  const mode = stored === "light" || stored === "dark" ? stored : "dark";
  const root = document.documentElement;
  root.classList.toggle("theme-dark", mode === "dark");
  root.classList.toggle("theme-light", mode === "light");
} catch (_) {}

const AuthWithRedirect = () => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };
  return (
    <Auth0Provider
      domain="dev-1qlaqx8pn3fopdzo.us.auth0.com"
      clientId="JoNwUA2RvimlRF3BiWFjnBeFuf15x4Hn"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <UserProvider>
        <App />
      </UserProvider>{" "}
    </Auth0Provider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <AuthWithRedirect />
  </BrowserRouter>,
  rootElement
);
