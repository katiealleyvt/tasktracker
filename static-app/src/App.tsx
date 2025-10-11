import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/main";
import { Provider } from "./components/ui/provider";
import { Auth0Provider } from "@auth0/auth0-react";
export const api_host =
  process.env.REACT_APP_API_HOST || "http://localhost:3000";
function App() {
  return (
    <div className="App">
      <Auth0Provider
    domain="dev-lsuvai0lfhu3sxhm.us.auth0.com"
    clientId="4z0sMoBjdjaqcAqSskB3Vox2iYLmXD5m"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      <Provider>
        <Main />
      </Provider>
      </Auth0Provider>
    </div>
  );
}

export default App;
