import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import PostText from './PostText'
import Comments from './Comments/Comments'

const useStyles = theme => ({
  rightPane: {
    padding: "0 30px",
    flex: 0
  },
});

class ReadPost extends Component {
    render(){
    const currentPostId = this.props.currentPostId
    const { classes } = this.props;
        return <Fragment>
            <Paper className={classes.rightPane}>
                <PostText
                    currentPostId = {currentPostId}
                />
                <Comments currentPostId = {currentPostId}/>
            </Paper>
          </Fragment>
    }

}

export default withStyles(useStyles) (ReadPost)