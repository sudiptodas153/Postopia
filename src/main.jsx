import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router.jsx'
import AuthProvider from './Context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="inter">
     <AuthProvider>
       <RouterProvider router={router}></RouterProvider>
     </AuthProvider>
    </div>
  </StrictMode>,
)
