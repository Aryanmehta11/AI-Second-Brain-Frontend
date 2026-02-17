import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import React from 'react'
import { AuthProvider } from './context/AuthContext.tsx'
import "./styles/App.css";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App/>
    </AuthProvider>
    
    </BrowserRouter>
  </React.StrictMode>
  
)
