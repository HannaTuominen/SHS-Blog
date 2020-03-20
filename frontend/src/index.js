import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
//import {BrowserRouter} from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
          light: '#E5E0DC',
          main: '#8E857E',
          dark: '#DCD0C2',
          contrastText: '#fff',
        },
        secondary: {
          light: '#E5E0DC',
          main: '#ADBEDB',
          dark: '#8E857E',
          contrastText: '#000',
        }
      },
//    palette: {
//        primary: { 500: '#E5E0DC' }, vaalea
//        secondary: { 500: '#ADBEDB' } sininen
//         #8E857E   tumma beige
//          #DCD0C2   vaalea beige
//    },
    typography: {
          fontFamily: '"Segoe UI"',
          textTransform: "none",
      }
})

//ReactDOM.render((<BrowserRouter>
//    <MuiThemeProvider theme={theme}>
//    <App />
//    </MuiThemeProvider>
//    </BrowserRouter>), document.getElementById('root'));

ReactDOM.render((
    <MuiThemeProvider theme={theme}>
    <App />
    </MuiThemeProvider>), document.getElementById('root'));


serviceWorker.unregister();
