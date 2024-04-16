import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Login } from "./components/login/Login.jsx"
import { Register } from "./components/registration/Register.jsx"
import { DashBoard } from "./components/dashboard/DashBoard.jsx"
import { NotFound } from "./components/404/NotFound.jsx"
import { News } from "./components/news/News.jsx"
import { ReadNews } from "./components/read-news/ReadNews.jsx"
import { AdminPanel } from './components/admin/AdminPanel.jsx'
import { Logout } from './components/logout/Logout.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Provider } from 'react-redux'

import Store from './services/Store.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Provider store={Store}><App /></Provider>,
    errorElement: <NotFound />
  },
  {
    path: "/login",
    element: <Provider store={Store}><Login /></Provider>
  },
  {
    path: "/register",
    element: <Provider store={Store}><Register /></Provider>
  },
  {
    path: "/dashboard",
    element: <Provider store={Store}><DashBoard /></Provider>
  },
  {
    path: "/news",
    element: <Provider store={Store}><News /></Provider>
  },
  {
    path: "/news/:newsId",
    element: <Provider store={Store}><ReadNews /></Provider>
  },
  {
    path: "/admin",
    element: <Provider store={Store}><AdminPanel /></Provider>
  },
  {
    path: "/logout",
    element: <Provider store={Store}><Logout /></Provider>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
