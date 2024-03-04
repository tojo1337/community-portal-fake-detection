import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './static/css/index.css'

import { Login } from './components/Login.jsx'
import { Register } from './components/Register.jsx'
import { UserDashboard } from './components/UserDashboard.jsx'
import { AdminDashboard } from './components/AdminDashboard.jsx'
import { ModDashboard } from './components/ModDashboard.jsx'
import { ErrorPage } from './components/ErrorPage.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthGuard } from './services/GuardService.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/moderator",
    element: <AuthGuard><ModDashboard /></AuthGuard>,
  },
  {
    path: "/user",
    element: <AuthGuard><UserDashboard /></AuthGuard>,
  },
  {
    path: "/admin",
    element: <AuthGuard><AdminDashboard /></AuthGuard>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
