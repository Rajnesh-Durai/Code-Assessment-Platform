import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from "@azure/msal-browser";
import { authConfig } from './authConfig'
import { MsalProvider } from "@azure/msal-react";
const root = ReactDOM.createRoot(document.getElementById('root'));
const pca = new PublicClientApplication(authConfig);
root.render(
    <MsalProvider instance={pca}>
    <App />
    </MsalProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
