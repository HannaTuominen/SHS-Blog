import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles";
import AuthenticationService from "../../service/AuthenticationService";
import Box from "@material-ui/core/Box";

const useStyles = theme => ({
  footer: {
    zIndex: "1",
    position: 'relative',

},
});

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return <Box className={classes.footer} bgcolor="primary.main">
      <Toolbar>
        <IconButton edge="start"color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit">Login</Button>
        <Button color="inherit" onClick={() => this.props.changeTheme()}>Change theme</Button>
      </Toolbar>
    </Box>
  }

}

export default withStyles(useStyles) (Footer);