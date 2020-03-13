import React, { Fragment, Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles }  from '@material-ui/core/styles'
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';

const useStyles = theme => ({
  header: {
    flexGrow: 1,
    padding: "10px"
  },
});

class Header extends Component {

    render(){
        const { classes } = this.props;
        return <div>
          <AppBar position="static" className={classes.header}>
            <Toolbar>
              {/* <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
              > */}
                {/* <MenuIcon /> */}
              {/* </IconButton> */}
              <Typography color="secondary" variant="h2">
                SHS-Blogs
              </Typography>

                  {/* <SearchIcon /> */}
                <InputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
            </Toolbar>
          </AppBar>
        </div>
    }
}

export default withStyles(useStyles) (Header)