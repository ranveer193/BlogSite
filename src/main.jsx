import {Provider} from 'react-redux'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import {Home,AddPost,AllPosts,Post,EditPost,Login,Signup} from './pages/index.js'
import {AuthLayout} from './components/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:
          <AuthLayout authentication = {false}>
            <Login/>
          </AuthLayout>
      },
      {
        path:'/signup',
        element:
          <AuthLayout authentication = {false}>
            <Signup/>
          </AuthLayout>
      },
      {
        path:'/add-post',
        element:
          <AuthLayout authentication>
            <AddPost/>
          </AuthLayout>
      },
      {
        path:'/all-posts',
        element:
          <AuthLayout authentication>
            <AllPosts/>
          </AuthLayout>
      },
      {
        path:'/post/:slug',
        element:<Post/>
      },
      {
        path:'/edit-post/:slug',
        element:
          <AuthLayout authentication>
            <EditPost/>
          </AuthLayout>
      } 
    ] 
  } 
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <RouterProvider router={router}>
  </RouterProvider>
  </Provider>
  </StrictMode>
)
