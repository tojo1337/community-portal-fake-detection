import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { Login } from "./components/login/Login.jsx"
import { Register } from "./components/registration/Register.jsx"
import { DashBoard } from "./components/dashboard/DashBoard.jsx"
import { NotFound } from "./components/404/NotFound.jsx"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthGuard } from './services/GuardService.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />
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
    path: "/dashboard",
    element: <DashBoard />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
