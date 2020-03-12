import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

function Footer() {
  return <AppBar position="static">
  <Toolbar>
    <IconButton edge="start"color="inherit" aria-label="menu">
    </IconButton>
    <Button color="inherit">Login</Button>
    <Button color="inherit">Login</Button>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
}

export default Footer;