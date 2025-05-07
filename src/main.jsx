import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter } from 'react-router-dom'
import { FaviconProvider } from './components/Global/FaviconProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider
      authType={'cookie'}
      authName='_auth'
      cookieDomain={window.location.hostname}
      cookieSecure={false}>
      <BrowserRouter>
        <FaviconProvider  >
          <App />
        </FaviconProvider>
      </BrowserRouter>
    </AuthProvider>

  </StrictMode>,
)
