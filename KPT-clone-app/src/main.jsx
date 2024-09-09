import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Memo from '../pages/memo.jsx'
import Board from '../pages/board.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Board />
  </StrictMode>,
)
