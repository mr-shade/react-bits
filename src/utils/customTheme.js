import { extendTheme } from "@chakra-ui/react";

export const toastStyles = {
  style: {
    fontSize: '12px',
    borderRadius: '0.75rem',
    border: '1px solid #392e4e',
    color: '#fff',
    backgroundColor: '#060010'
  }
};

export const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  styles: {
    global: {
      'html, body': {
        minHeight: '100vh',
        fontFamily: '"Figtree", sans-serif',
        backgroundColor: '#060010'
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
            bg: "#271E37",
          },
          filledTrack: {
            bg: "#fff",
          },
        },
      },
      defaultProps: {
        variant: "solid",
      },
    },
    Switch: {
      baseStyle: {
        track: {
          // Unchecked state (default)
          bg: "#271E37",
          _checked: {
            bg: "#5227FF",
          },
          _focus: {
            boxShadow: "0 0 0 3px #271E37",
          },
          _active: {
            bg: "#5227FF",
          },
        },
        thumb: {
          _checked: {
            bg: "white",
          },
          _active: {
            bg: "white",
          },
        },
      },
    }
  }
});