import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/authcontext';
import LinksContexProvider from './context/LinksContex';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
  <LinksContexProvider>
    <App />
  </LinksContexProvider>
  </AuthContextProvider>
);


