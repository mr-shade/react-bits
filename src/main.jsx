import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'

import { HelmetProvider } from 'react-helmet-async';

import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from './utils/customTheme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={customTheme}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ChakraProvider>,
)
