import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/main';
import { Provider } from './components/ui/provider';
export const api_host =
  process.env.VITE_API_HOST || "http://localhost:3000";
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
