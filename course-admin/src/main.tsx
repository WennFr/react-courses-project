// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import { MsalProvider } from '@azure/msal-react'
import './styles/App.css'
import App from './App.tsx'
import { msalInstance } from './auth/authConfig.ts'

async function bootstrap() {
  await msalInstance.initialize()

  createRoot(document.getElementById('root')!).render(
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MsalProvider>
  )
}

void bootstrap()
