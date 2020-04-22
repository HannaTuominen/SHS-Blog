import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles }  from '@material-ui/core/styles';
import img1 from '../../images/blogi_tausta4.png';
import img2 from '../../images/blogi_tausta5.png';
import AuthenticationService from '../../service/AuthenticationService';
import history from "../Blogposts/history";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
const useStyles = theme => ({
  display: {
    visibility: 'visible',
    fontSize:"1.2vw",
    ['@media (max-width:1200px)']: { // eslint-disable-line no-useless-computed-key
      fontSize:"1.5vw",
    },
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      display: 'none',
    }
  },
  title: {
      cursor: "pointer",
      padding: "20px",
      flexGrow: 1,
      justifyContent: 'center',
      fontSize:"5vw",
      ['@media (max-width:1200px)']: { // eslint-disable-line no-useless-computed-key
        padding: "00px",
        flexGrow: 0,
      },
      ['@media (max-width:980px)']: { // eslint-disable-line no-useless-computed-key
        padding: "0px",
        flexGrow: 0,

      }
    },

    headerText: {
        display: 'inline-block'

    },
    alignItemsAndJustifyContent: {
        backgroundImage:"img",
        position: 'absolute',
        top: 20,
        flexGrow: 1,
        padding: "10px",
        minHeight: 100,
        alignItems: 'center',
        background: 'transparent',
        boxShadow: 'none',
        ['@media (max-width:1200px)']: { // eslint-disable-line no-useless-computed-key
          top: 10,

        },
        ['@media (max-width:980px)']: { // eslint-disable-line no-useless-computed-key
          top: 5,
          minHeight: 0,
        },
        ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
          top: 0,
          minHeight: 0,
        }
      },

      headerImage: {
          flexGrow: 1,
          width: "100%",
        },
});



class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: AuthenticationService.isUserLoggedIn(),
      isThemeDefault: props.isThemeDefault,
    };
  }

  componentWillReceiveProps(props){
    this.setState({
      isThemeDefault:props.isThemeDefault,
      isLoggedIn: props.isUserLoggedIn
    })
  }
  render(){
    const { classes } = this.props;
    const { isThemeDefault } = this.state;

    return <Box>

    <img src={isThemeDefault ? img1 : img2} className={classes.headerImage}  />
      <Box>
      <AppBar position="static" className={classes.alignItemsAndJustifyContent} >

        <Typography color="primary.light" variant="h1" className={classes.title} onClick={() => history.push('/')} >
          SHS-Blogs
        </Typography>
        <Typography color="primary.light" className={classes.display}>
          Mieleni minun tekevi, aivoni ajattelevi lähteäni laulamahan, saaani sanelemahan, sukuvirttä suoltamahan, lajivirttä laulamahan.
        </Typography>
        <Typography color="primary.light" className={classes.display}>
           Sanat suussani sulavat, puheet putoelevat, kielelleni kerkiävät, hampahilleni hajoovat.
        </Typography>
        {!this.state.isLoggedIn && <Button onClick={() => history.push('/login')}>Login</Button>}
        {this.state.isLoggedIn && <Button onClick={() => {
          AuthenticationService.logout();
          this.props.changeUserLogIn(false)
          history.push('/logout')
        }}>Logout</Button>}

      </AppBar>
      </Box>
  </Box>
  }
}

export default withStyles(useStyles) (Header)