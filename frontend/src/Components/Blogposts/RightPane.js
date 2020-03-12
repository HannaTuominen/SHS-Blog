import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'

const useStyles = theme => ({
  rightPane: {
    padding: "0 30px",
    height: 500
  },
});

class RightPane extends Component {

    render(){
    const { classes } = this.props;
        return <Fragment>
            <Paper className={classes.rightPane}>
                <p>This is left pane</p>
            </Paper>
          </Fragment>
    }

}

export default withStyles(useStyles) (RightPane)