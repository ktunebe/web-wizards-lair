import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Error from './pages/Error';
import EditorSandbox from './pages/EditorSandbox.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/profiles/:userId',
        element: <Profile />
      },
      {
        path: '/editor-sandbox',
        element: <EditorSandbox />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
