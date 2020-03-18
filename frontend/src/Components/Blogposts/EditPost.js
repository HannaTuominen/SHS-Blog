import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import PostText from './PostText'
import TextEditor from './TextEditor'

const useStyles = theme => ({
  rightPane: {
    padding: "0 30px",
    height: 430
  },
});

class EditPost extends Component {

    render(){
    const { classes } = this.props;
        return <Fragment>
            <Paper className={classes.rightPane}>
                <TextEditor/>
            </Paper>
          </Fragment>
    }

}

export default withStyles(useStyles) (EditPost)