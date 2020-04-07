import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import PostText from './PostText'
import Comments from './Comments/Comments'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import history from './history'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


const useStyles = theme => ({
  rightPane: {
    padding: "30px 30px 0px 30px",
    margin: "30px",
    flex: 0,
    height: "100%",
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      margin: "0px",
      height: "100%",
    }
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
  },
     leftBtn: {
       margin: "1px 0px 3px 10px ",
       flexDirection: 'row',
       justifyContent: 'flex-start',
       alignItems: 'center',
     }
});

class ReadPost extends Component {
  constructor(props){
    super(props)
    this.deletePost = this.deletePost.bind(this)
    this.state = {currentPost : props.currentPost}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentPost : nextProps.currentPost})
  }

  deletePost(){
    fetch('api/delete/' + this.props.currentPostId, {
      method: "delete",
    })
    .catch(err => console.log(err))

    history.push('/')
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
              >Edit this post
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
            currentPost = {this.state.currentPost}
          />
        </div>
        <br/>
        <Box bgcolor="secondary.light" display="flex">

            <Box  className={classes.leftContainer}>
              <Button className={classes.btn}
                  size="small"
//                        variant="contained"
                  color="#000"
                  startIcon={<ArrowLeftIcon style={{ fontSize: 35 }}/>}
                  onClick={() => this.props.moveToNextPost(false)}
                > Previous post
              </Button>
            </Box>
            <Box>
              <Button className={classes.leftBtn}
                  size="small"
//                        variant="contained"
                  color="#000"
                  endIcon={<ArrowRightIcon style={{ fontSize: 35 }}/>}
                  onClick={() => this.props.moveToNextPost(true)}
                > Next post
              </Button>
            </Box>
          </Box>
        <br/>
        <Comments currentPostId = {currentPostId}/>
      </Paper>
      </Fragment>
  }

}

export default withStyles(useStyles) (ReadPost)
