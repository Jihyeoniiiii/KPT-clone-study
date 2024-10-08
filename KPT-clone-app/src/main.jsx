import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css';
import Account from '../src/pages/account.jsx';
import Board from '../src/pages/board.jsx';

const router = createBrowserRouter([
{
    path: '/',
    element: <Account />,
    children: [
      {
        path: '/:userId/board',
        element: <Board />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
