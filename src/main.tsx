import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthenticationPage } from './routes/authentication-page'
import ErrorPage from './error-page'
import { FormRegister } from './components/sign-up&in forms/register-form'
import { FormLogIn } from './components/sign-up&in forms/login-form'
import { ConfirmationPage } from './components/sign-up&in forms/confirmation-form'
import { LandingPage } from './routes/landing-page'
import { Feed } from './routes/personalized-routes/feed'
import { FeedMain } from './components/feed/feed'
import { BlogPostCreator } from './components/feed/post'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'sign-up',
    element: <AuthenticationPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <FormRegister /> },
      { path: 'login', element: <FormLogIn /> },
      { path: 'confirmation-page', element: <ConfirmationPage /> },
    ],
  },
  {
    path: 'feed',
    element: <Feed />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <FeedMain /> },
      {
        path: 'create-blog-post', element: <BlogPostCreator />
    },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
