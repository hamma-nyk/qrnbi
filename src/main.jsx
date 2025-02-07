import './css/style.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import CreateQR from './pages/CreateQR'

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateQR />,
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
