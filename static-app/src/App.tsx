import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/main';
export const api_host =
  process.env.VITE_API_HOST || "http://localhost:3000";
function App() {
  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
