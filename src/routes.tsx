import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/home'
import { Detail } from './pages/detail'
import { NotFound } from './pages/notFound'

export const router = createBrowserRouter([
   {
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/detail',
            element: <Detail/>
        },
        {
            path: "*",
            element: <NotFound/>
        }
    ]
   }
])