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
          light: '#DBE0DC',
          main: '#9790a3',
          dark: '#DCD0C2',
          contrastText: '#fff',
        },
        secondary: {
          light: '#DBE0DC',
          main: '#A6BDB7',
          dark: '#8DA09B',
          contrastText: '#000',
        }
      },
//    palette: {
//        primary: { 500: '#E5E0DC' }, vaalea
//          #95A4BC   tumma sininen
//        secondary: '#ADBEDB' sininen
//         #817E8E   tumma harmahtava
//          #DCD0C2   vaalea beige
//          #EAEFEB   paper-tausta
//          #9790a3   tumma-lila
//          #A6BDB7   vaalea vihreä
//          #8DA09B   tumma vihreä
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
