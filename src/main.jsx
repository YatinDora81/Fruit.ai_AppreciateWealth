import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import toast, { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/Auth.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Chat from './pages/Chat.jsx';
import Faqs from './pages/Faqs.jsx';
import { Provider } from 'react-redux';
import Store from "./redux/Store.js"

const router = createBrowserRouter([
  {
    path : "/",
    element : <App></App>,
    children : [
      {
        path : "/",
        element : <Auth></Auth>
      },
      {
        path : "/home",
        element : <Home></Home>
      },
      {
        path : "/about",
        element : <About></About>
      },
      {
        path : "/chat",
        element : <Chat></Chat>
      },
      {
        path : "/faqs",
        element : <Faqs></Faqs>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}><RouterProvider router={router}></RouterProvider></Provider>
    <Toaster></Toaster>
  </StrictMode>,
)
