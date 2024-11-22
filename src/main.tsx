import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


//ignore the warning for the transition to react router v7, the lates version by today is 6.28
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0]?.includes("React Router Future Flag Warning")
  ) {
    return;
  }
  originalWarn(...args);
};
