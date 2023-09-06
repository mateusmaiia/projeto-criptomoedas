import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/home'
import { Detail } from './pages/detail'
import { NotFound } from './pages/notFound'

import { Layout } from './pages/components/layout'

export const router = createBrowserRouter([
   {
    element: <Layout/>,
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/detail/:cripto',
            element: <Detail/>
        },
        {
            path: "*",
            element: <NotFound/>
        }
    ]
   }
])