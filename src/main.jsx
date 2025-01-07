import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  styles: {
    global: {
      'html, body': {
        minHeight: '100vh',
        fontFamily: '"DM Sans", sans-serif',
        backgroundColor: '#060606'
      }
    }
  },
  components: {
    Slider: {
      baseStyle: {
        thumb: {
          bg: "#fff",
          _focus: {
            boxShadow: "none"
          },
        },
      },
      variants: {
        solid: {
          track: {
            bg: "#222",
          },
          filledTrack: {
            bg: "#fff",
          },
        },
      },
      defaultProps: {
        variant: "solid",
      },
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={customTheme}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ChakraProvider>,
)
