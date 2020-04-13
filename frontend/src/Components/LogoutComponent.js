import React, { Component } from 'react'
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";

const useStyles = theme => ({
  welcome: {
    padding: "50px 0px 0px 50px",
    margin: "30px 30px 0px 30px",
    height:"360px",
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      margin: "0px",
      padding: "50px 0px 0px 50px",
    }
  },
  btn: {
    width: 205
  }
});
class LogoutComponent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper height="360px" className={classes.welcome}>
        <h1>Logged out</h1>
        <pre className="container">
          You are no longer an admin.
        </pre>
      </Paper>
    )
  }
}
export default withStyles(useStyles) (LogoutComponent)