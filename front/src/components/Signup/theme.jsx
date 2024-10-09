// theme.js o theme.ts
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    sky: {
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#90cdf4',
      400: '#63b3ed',
      500: '#4299e1',
      600: '#3182ce',
      700: '#2b6cb0',
      800: '#2c5282',
      900: '#2a4364',
    },
  },
  // Puedes agregar más configuraciones aquí, como estilos globales, componentes, etc.
})

export default theme
