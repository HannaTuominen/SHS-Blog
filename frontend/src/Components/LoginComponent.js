import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService';
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {TextField} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";

const useStyles = theme => ({
  welcome: {
    padding: "50px 0px 0px 50px",
    margin: "30px 30px 0px 30px",
    height:"100vh",
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      margin: "0px",
      padding: "50px 0px 0xp 50px",
      height:"73vh",
    }
  },
  btn: {
    width: 205
  },
  textField: {
    margin: theme.spacing(1),
    width: '25ch',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },

});

class LoginComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: 'admin',
      password: 'admin',
      hasLoginFailed: false,
      showSuccessMessage: false,
      showPassword: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.loginClicked = this.loginClicked.bind(this)
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]
          : event.target.value
      }
    )
  }
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  loginClicked() {
    // if(this.state.username==='admin' && this.state.password==='admin'){
    //   AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
    //   this.props.history.push(`/edit`)
    //   // this.setState({showSuccessMessage:true})
    //   // this.setState({hasLoginFailed:false})
    // }
    // else {
    //   this.setState({showSuccessMessage:false})
    //   this.setState({hasLoginFailed:true})
    // }
    AuthenticationService
      .executeBasicAuthenticationService(this.state.username, this.state.password)
      .then(() => {
        console.log("successfully logged in");
        AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        this.setState({showSuccessMessage:true})
    }).then(() => this.props.changeUserLogIn(true))
      .then(() => this.props.history.push('/'))
      .catch(() => {
      this.setState({ showSuccessMessage: false })
      this.setState({ hasLoginFailed: true })
      console.log("failed to log in");
    })

  }
  //TODO: if user is already logged in display something else?
  render() {

    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.welcome}>
          <h1>Login</h1>
          {!AuthenticationService.isUserLoggedIn() ?
          <Box className="container">
            <Box>{this.state.hasLoginFailed && <pre className="alert alert-warning">Invalid Credentials</pre>}
              {this.state.showSuccessMessage && <pre>Login Successful</pre>}</Box>
          <Box>
            <FormControl className={classes.textField}>
              <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                value={this.state.username}
                onChange={this.handleChange}
                name="username"
              />
            </FormControl>
          </Box>
            <Box>
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={this.handleChange}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.password ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Button className="btn btn-success" onClick={this.loginClicked}>Login</Button>
          </Box>
            : <Box className="container">
              <Box><pre> You are currently logged in.</pre></Box>
              </Box>
          }
        </Paper>

      </div>
    )
  }
}
export default withStyles(useStyles) (LoginComponent)
