import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider as ReduxProvider } from "react-redux";
import { store } from './features/store.js';
import './styles/Main.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>
)
