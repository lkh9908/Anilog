// import logo from './logo.svg';
import React, {useState} from 'react';
import {createBrowserRouter, RouterProvider, Route, Outlet} from 'react-router-dom'

import './style.scss';
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { UserInfo } from './pages/UserInfo';
import { WatchList } from './pages/WatchList';
import { Anime } from './pages/Anime';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/userInfo",
        element: <UserInfo />,
      },
      {
        path: "/watchList",
        element: <WatchList />,
      },
      {
        path: "/Anime/:id",
        element: <Anime />,
      }
    ],
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
])


function App() {
  // const [currentForm, setcurrentForm] = useState('login')
  
  // const toggleForm = (formName) => {
  //   setcurrentForm(formName)
  // }
  return (
    // <div className="App">
    //   {
    //     currentForm === "login" ? <Login onFormSwitch = {toggleForm} /> : <Register onFormSwitch = {toggleForm} />
    //   }
      
    // </div>
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>

  );
}

export default App;
