import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles }  from '@material-ui/core/styles'


const useStyles = theme => ({
  leftPane: {
    padding: "0 30px",
    flex: 0
  },
});

class WelcomePane extends Component{

  render(){
    return <div>
        <h1>Welcome, Friend!</h1>
    </div>
  }
}

export default withStyles(useStyles)(WelcomePane)