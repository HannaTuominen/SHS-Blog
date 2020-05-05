import React, {Component} from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import history from "../Blogposts/history";
import AuthenticationService from "../../service/AuthenticationService";
import AppBar from "@material-ui/core/AppBar";

const useStyles = theme => ({
});

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: AuthenticationService.isUserLoggedIn(),
    };
  }

  componentWillReceiveProps(props){
    this.setState({
      isLoggedIn: props.isUserLoggedIn
    })
  }

  render() {
    const { classes } = this.props;
    return <Box bgcolor="primary.main" height="inherit" paddingLeft="1rem">
      <Box display="flex" >
        <Box flexGrow={1}></Box>
        <Box padding="7px 7px 7px 7px">
          {!this.state.isLoggedIn && <Button onClick={() => history.push('/login')}>Login</Button>}
          {this.state.isLoggedIn && <Button onClick={() => {
            AuthenticationService.logout();
            this.props.changeUserLogIn(false)
            history.push('/logout')
          }}>Logout</Button>}
          <Button color="inherit" onClick={() => this.props.changeTheme()}>Change theme</Button>
        </Box>
        <Box flexGrow={1}></Box>
      </Box>


    </Box>
  }

}

export default withStyles(useStyles) (Footer);
