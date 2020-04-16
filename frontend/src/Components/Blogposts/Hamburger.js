import React from 'react';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Component } from 'react';
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import BookIcon from '@material-ui/icons/Book';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginTop:'25px'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: 10,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  },
  button: {
    position:'fixed',
    display:'fixed',
    top:'10px',
    left:'0',
    zIndex:9999
  }
});

class Hamburger extends Component{

  constructor(props) {
    super(props);

    this.state = {
      setOpen: false,
      theme: 'ltr',
      data: []
    };
    this.fetchPosts()
  }

  fetchPosts = () => {
    fetch('/api/getAllPosts/',{
      mode: 'no-cors', // 'cors' by default
      credentials: "same-origin"
    }).then(data => data.json()).then(this.updatePage).catch(this.serverError)
  }
  serverError = (data) => {
    console.log('Server error while fetching posts data')
    console.log(data)
  }

  updatePage = (data) => {
    let items = [];
    for (let n = 0; n < data.length; n++) {
      items.push(<ListItem alignItems="center">
        <Box flexGrow={1} align="center">
          <Link
            component="button"
            onClick={() => {
              this.props.idChangeCallback(data[n][1])
              this.setState({setOpen: false})
            }}
          >
            {data[n][0]}
          </Link>
        </Box>
      </ListItem>)
    }
    this.setState({'data' : items});
    this.props.dataCallback(data);
  }

  handleDrawerOpen = () => {
    this.setState({setOpen: !this.state.setOpen});
  };


  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        <CssBaseline />
        {/*<AppBar*/}
        {/*  position="fixed"*/}
        {/*  className={clsx(classes.appBar, {*/}
        {/*    [classes.appBarShift]: this.state.setOpen*/}
        {/*  })}*/}
        {/*>*/}
        {/*  <Toolbar>*/}
          {/*  <Typography variant="h6" noWrap className={classes.title}>*/}
          {/*    Persistent drawer*/}
          {/*  </Typography>*/}
          <Box className={classes.button}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={this.handleDrawerOpen}
              className={clsx(this.state.setOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/*</Toolbar>*/}
        {/*</AppBar>*/}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open= {this.state.setOpen}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerOpen}>
              {this.state.theme === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {this.state.data.map((text, index) => (
                      <ListItem button key={index}>
                        <ListItemIcon>{index % 2 === 0 ? <BookIcon /> : <MenuBookIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
          </List>
        </Drawer>
      </Box>

    );
  }

}
export default withStyles(useStyles) (Hamburger)