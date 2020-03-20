import React, { Fragment, Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles }  from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = theme => ({
  title: {
      padding: "20px",
      flexGrow: 1,
      justifyContent: 'center'
    },
    alignItemsAndJustifyContent: {
        flexGrow: 1,
        padding: "10px",
        minHeight: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
});

class Header extends Component {

    render(){
        const { classes } = this.props;
        return <div>
          <AppBar position="static" className={classes.alignItemsAndJustifyContent}>
            <Toolbar>
              <Typography color="secondary" variant="h1" className={classes.title}>
                SHS-Blogs
              </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
    }
}

export default withStyles(useStyles) (Header)