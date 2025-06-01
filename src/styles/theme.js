// Tema futurista para o aplicativo
// Nota: Como estamos usando Chakra UI v3.x, não usamos extendTheme
// Em vez disso, usaremos CSS puro para estilização

// Este arquivo serve apenas como referência de cores e estilos
const theme = {
  colors: {
    brand: {
      black: '#000000',
      orange: {
        50: '#FFF3E0',
        100: '#FFE0B2',
        200: '#FFCC80',
        300: '#FFB74D',
        400: '#FFA726',
        500: '#FF8C42', // Laranja fosco principal
        600: '#F57C00',
        700: '#EF6C00',
        800: '#E65100',
        900: '#BF360C',
      },
      white: '#FFFFFF',
      gray: {
        50: '#F5F5F5',
        100: '#EEEEEE',
        200: '#E0E0E0',
        300: '#BDBDBD',
        400: '#9E9E9E',
        500: '#757575',
        600: '#616161',
        700: '#424242',
        800: '#333333', // Cinza escuro principal
        900: '#212121',
      },
      blue: {
        500: '#3182CE',
        600: '#2B6CB0',
      },
      green: {
        500: '#38A169',
        600: '#2F855A',
      },
      red: {
        500: '#E53E3E',
        600: '#C53030',
      },
    },
  },
  fonts: {
    body: "'Poppins', sans-serif",
    heading: "'Montserrat', sans-serif",
  }
};

export default theme;
