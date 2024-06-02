import { createBrowserRouter } from "react-router-dom";

import { Login, Register } from "../auth/index";
import { App } from "../App";
import { Home } from "../dashboard/Home"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/home',
                element: <Home />
            }
        ]
    }
])