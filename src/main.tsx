import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ElevatorProvider } from './context/ElevatorContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ElevatorProvider>
      <App />
    </ElevatorProvider>
  </StrictMode>,
)
