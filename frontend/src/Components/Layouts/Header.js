import React, { Fragment, Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import { withStyles }  from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import img from '../../images/blogi_tausta4.png'

const useStyles = theme => ({
  title: {
      padding: "20px",
      flexGrow: 1,
      justifyContent: 'center',
    },
    headerText: {
        display: 'inline-block'
    },
    alignItemsAndJustifyContent: {
        position: 'absolute',
        top: 20,
        flexGrow: 1,
        padding: "10px",
        minHeight: 150,
        alignItems: 'center',
        background: 'transparent',
        boxShadow: 'none'
      },
      headerImage: {
          flexGrow: 1,
          width: "100%"
        },

});

class Header extends Component {

    render(){
        const { classes } = this.props;
        return <div>
        <img src={img} className={classes.headerImage} />
          <AppBar position="static" className={classes.alignItemsAndJustifyContent}>
                  <Typography color="primary.light" variant="h1" className={classes.title}>
                    SHS-Blogs
                  </Typography>
              <Typography color="primary.light">
                  Mieleni minun tekevi, aivoni ajattelevi lähteäni laulamahan, saaani sanelemahan, sukuvirttä suoltamahan, lajivirttä laulamahan.
                </Typography>
                <Typography color="primary.light">
                   Sanat suussani sulavat, puheet putoelevat, kielelleni kerkiävät, hampahilleni hajoovat.
                </Typography>
                <Button color="inherit">Login</Button>
          </AppBar>
        </div>
    }
}

export default withStyles(useStyles) (Header)