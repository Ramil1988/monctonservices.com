import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { Auth0Provider } from "@auth0/auth0-react";

import UserProvider from "./Components/UserContext";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Auth0Provider
    domain="dev-1qlaqx8pn3fopdzo.us.auth0.com"
    clientId="JoNwUA2RvimlRF3BiWFjnBeFuf15x4Hn"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <UserProvider>
      <App />
    </UserProvider>{" "}
  </Auth0Provider>,
  rootElement
);
