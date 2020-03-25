import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles";
import AuthenticationService from "../../service/AuthenticationService";

const useStyles = theme => ({
  footer: {
    position: "relative",
    bottom:"0"
},
});

class Footer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { classes } = this.props;
    return <AppBar position="static" className={classes.footer}>
      <Toolbar>
        <IconButton edge="start"color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit">Login</Button>
        <Button color="inherit">Login</Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  }

}

export default withStyles(useStyles) (Footer);