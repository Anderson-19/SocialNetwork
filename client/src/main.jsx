import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { SocketContextProvider } from './context/SocketContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketContextProvider>
      <RouterProvider router={router} />
    </SocketContextProvider>
  </React.StrictMode>,
)
