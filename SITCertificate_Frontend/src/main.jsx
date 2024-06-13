import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import UserLoginPage from './pages/UserLoginPage'
import './index.css'
const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserLoginPage />
    </ChakraProvider>
  </React.StrictMode>,
)