import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import RolePlayGame from './RolePlayGame.tsx'
import QuizGame from './components/QuizGame.tsx'

const search = window.location.search;
const isRpg = search.includes('game=rpg') || window.location.pathname.includes('/rpg');
const isQuiz = search.includes('game=quiz') || window.location.pathname.includes('/quiz');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isQuiz ? <QuizGame /> : isRpg ? <RolePlayGame /> : <App />}
  </StrictMode>,
)
