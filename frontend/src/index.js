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
        primary: { 500: '#FFE3B0' },
        secondary :{ A400: '#807258' },
        textPrimary: { 500: '#FEFEF8'}
    },
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
