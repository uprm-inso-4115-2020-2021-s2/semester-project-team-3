import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#508AA8',
        //contrastText: '#fff',
    },
    secondary: {
        light: '#4285F4',
        main: '#031927',
        //contrastText: '#fff',
        
        dark: '#1A4688',
    },
    info: {
        main: '#C8E0F4',
        contrastText: '#000',
    },
    background: {
      default: '#F4F4F9'
    },
  },
//   typography: {
//     fontFamily: 'Montserrat',
//   },
});

export default theme
