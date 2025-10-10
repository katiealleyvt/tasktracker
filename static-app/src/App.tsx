import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/main';
import { Provider } from './components/ui/provider';
export const api_host =
  process.env.API_HOST || "http://localhost:3000";
  console.log("Api host", api_host)
function App() {
  return (
    <div className="App">
      <Provider>
      <Main/>

      </Provider>
    </div>
  );
}

export default App;
