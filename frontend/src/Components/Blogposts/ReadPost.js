import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import PostText from './PostText'
import Comments from './Comments/Comments'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import history from './history'

const useStyles = theme => ({
  rightPane: {
    padding: "30px 30px 0px 30px",
    margin: "30px",
    flex: 0,
    height: "100%",
  },
  postText: {
    margin: "30px 30px 30px 30px",
    flex: 0
  },
  leftContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  btn: {
    flex: 0,
    margin: "1px 0px 3px 10px ",
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

class ReadPost extends Component {
  constructor(props){
    super(props)
    this.deletePost = this.deletePost.bind(this)
  }

  deletePost(){
    fetch('api/delete/' + this.props.currentPostId, {
      method: "delete",
    })
    .catch(err => console.log(err))

    history.push('/')
  }

  callback = (postText) => {
    this.props.callback(postText);
  }

  render(){
  const currentPostId = this.props.currentPostId
  const { classes } = this.props;
    return <Fragment>
      <Paper className={classes.rightPane}>
        <Box bgcolor="secondary.light" display="flex">
          <Box className={classes.leftContainer}/>
          <Box>
            <Button className={classes.btn}
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => history.push('/edit')}
              > Edit this post
            </Button>
          </Box>
          <Box>
            <Button className={classes.btn}
                size="small"
                variant="contained"
                color="secondary"
                onClick={this.deletePost}
              > Delete this post
            </Button>
          </Box>
        </Box>
        <div className={classes.postText}>
          <PostText
            currentPostId = {currentPostId}
            callback = {this.callback}
          />
        </div>
        <br/>
        <br/>
        <Comments currentPostId = {currentPostId}/>
      </Paper>
      </Fragment>
  }

}

export default withStyles(useStyles) (ReadPost)
