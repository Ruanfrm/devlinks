import { createBrowserRouter } from "react-router-dom"

import Home from './pages/home'
import Login from "./pages/login"
import Admin from "./pages/admin"
import Error from "./pages/error"
import Networks from "./pages/networks"

import Privete from "./routes/privete"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  }, 
  {
    path: '/login',
    element: <Login/>

  },
  {
    path: '/admin',
    element:<Privete> <Admin/>  </Privete>
  },
  {
    path: "*",
    element: <Error/>
  },
  {
    path: "/admin/social",
    element:<Privete> <Networks/> </Privete> 
  }
])

export {router};