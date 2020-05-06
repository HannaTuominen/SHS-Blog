import React, { Fragment, Component } from 'react'
import { withStyles }  from '@material-ui/core/styles'
import {Box, Button, Typography} from '@material-ui/core'
import moment from "moment";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = theme => ({
  left: {
    display: "inline",
  },
  right: {
    justifyContent: 'flex-end'
  },
});


const StyledButton = withStyles({
  root: {
    // background: 'secondary',
    borderRadius: 0,
    border: 0,
    color: 'black',
    height: 20,
    width:10,
    padding: '0',
    margin:'0',
    minWidth: 25,
  },
})(Button);

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
        thumbsUp: this.props.comment.thumbsUp,
    };
  }

  addThumbsUp = (commentId) => {
    this.setState({ thumbsUp: this.state.thumbsUp + 1 });
    fetch('api/thumbsUp/'+commentId,  {
      method: "post",
    })
      .catch(err => console.log(err))
    console.log("added to backend plus thumbs up " + commentId);
  }

  removeThumbsUp = (commentId) => {
    this.setState({ thumbsUp: this.state.thumbsUp - 1 });
    fetch('api/thumbsDown/'+commentId,  {
      method: "post",
    })
      .catch(err => console.log(err))
    console.log("added to backend minus thumbs up " + commentId);
  }

  deleteComment = (id) => {
    fetch('api/deleteComment/'+id,  {
      method: "delete",
    })
      .catch(err => console.log(err))
    console.log("deleted" + id);
    this.props.removeComment(id)
  }

    render() {
    let {time, name, message, parentPost, thumbsUp, id} = this.props.comment;
      return (
        <Fragment>
          <Box bgcolor="white" padding="10px 10px 10px 10px">
            <Box bgcolor="secondary.dark" display="flex">
              <Box flexGrow={1} padding="10px 10px 10px 10px"><Typography className="left"> {moment(time).format('DD-MM-YYYY HH:mm')}</Typography></Box>
              <Box  padding="10px 10px 10px 10px"><Typography className="left">{name}</Typography></Box>
            </Box>
            <Box padding="10px 10px 10px 10px" bgcolor="secondary.light" display="flex">
              <Box flexGrow={1} padding="10px 10px 10px 10px">
                <Typography className="left"  style={{ fontFamily: 'inherit' }}>{message}</Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Box bgcolor="secondary.dark" padding="10px 10px 10px 10px" flexGrow={1} className="left">
                <StyledButton color="secondary" onClick={() => this.addThumbsUp(id)}><ThumbUpIcon style={{fontSize: 20}}/></StyledButton>
                <Typography style={{display: 'inline-block', padding: '0px 20px 0px 20px'}} >{this.state.thumbsUp}</Typography>
                <StyledButton color="secondary" onClick={() => this.removeThumbsUp(id)}><ThumbDownIcon style={{fontSize: 20}}/></StyledButton>
              </Box>
              <Box className="right" bgcolor="secondary.dark" padding="10px 10px 0px 10px">
                {this.props.isUserLoggedIn ?
                <Button onClick={() => this.deleteComment(this.props.comment.id)}>Delete</Button>
                  : void 0
                }

              </Box>
            </Box>
          </Box>
        </Fragment>
        )
    }
}

export default withStyles(useStyles) (Comment)
