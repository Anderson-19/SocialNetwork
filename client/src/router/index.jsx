import { createBrowserRouter } from "react-router-dom";

import { Login, Register } from "../auth/index";
import { App } from "../App";
import { Home, Likes, Comments, Bookmarks, Profile, Messages } from "../dashboard/pages"

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
            },
            {
                path: '/comments/:username',
                element: <Comments />
            },
            {
                path: '/bookmarks',
                element: <Bookmarks />
            },
            {
                path: '/likes',
                element: <Likes />
            },
            {
                path: '/profile/:username',
                element: <Profile />
            },
            {
                path: '/messages',
                element: <Messages />
            }
        ]
    }
])