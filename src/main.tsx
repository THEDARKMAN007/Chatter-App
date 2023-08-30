import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthenticationPage } from './routes/authentication-page'
import ErrorPage from './error-page'
import { FormRegister } from './components/authentication/register-form'
import { FormLogIn } from './components/authentication/login-form'
import { ConfirmationPage } from './components/authentication/confirmation-form'
import { LandingPage } from './routes/landing-page'
import { Feed } from './routes/feed'
import { BlogPostCreator } from './routes/post'
import { ForYou } from './components/feed/forYou'
import { Featured } from './components/feed/featured'
import { Recent } from './components/feed/recent'

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
      { index: true, element: <ForYou /> },
      {
        path: 'featured',
        element: <Featured />,
      },
      {
        path: 'recent',
        element: <Recent />,
      },
    ],
  },
  {
    path: 'post',
    element: <BlogPostCreator />,
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
