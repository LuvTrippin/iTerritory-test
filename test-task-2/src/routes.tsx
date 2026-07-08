import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { GuestRoute, ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/LoginPage/LoginPage'

export const routes: RouteObject[] = [
    {
        path: '/login',
        element: (
            <GuestRoute>
                <LoginPage />
            </GuestRoute>
        ),
    },
    {
        element: <ProtectedRoute />,
        children: [
            { path: '/', element: <HomePage /> },
        ],
    },
]

export const router = createBrowserRouter(routes)
