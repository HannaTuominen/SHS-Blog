import React, { Fragment, Component } from 'react'
import { withStyles }  from '@material-ui/core/styles'
import {Box, Button, Typography} from '@material-ui/core'
import { borders } from '@material-ui/system';
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

  addThumbsUp = () => {
    this.setState({ thumbsUp: this.state.thumbsUp + 1 });
  }

  removeThumbsUp = () => {
    this.setState({ thumbsUp: this.state.thumbsUp - 1 });
  }

  deleteComment = () => {

  }

    render() {
    let {time, name, message, parentPost, thumbsUp} = this.props.comment;
      return (
        <Fragment>
          <Box bgcolor="white" padding="10px 10px 10px 10px">
            <Box bgcolor="secondary.dark" display="flex">
              <Box flexGrow={1} padding="10px 10px 10px 10px"><Typography className="left"> {moment(time).format('DD-MM-YYYY HH:mm')}</Typography></Box>
              <Box  padding="10px 10px 10px 10px"><Typography className="left">{name}</Typography></Box>
            </Box>
            <Box padding="10px 10px 10px 10px" bgcolor="secondary.light" display="flex">
              <Box flexGrow={1} padding="10px 10px 10px 10px">
                <Typography className="left"><pre style={{ fontFamily: 'inherit' }}>{message}   {parentPost} </pre></Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Box bgcolor="secondary.dark" padding="0px 10px 0px 10px" flexGrow={1} className="left">
                <StyledButton color="secondary" onClick={this.addThumbsUp}><ThumbUpIcon style={{fontSize: 20}}/></StyledButton>
                <Typography style={{display: 'inline-block', padding: '0px 20px 0px 20px'}}><pre style={{ fontFamily: 'inherit'}}>{this.state.thumbsUp}</pre></Typography>
                <StyledButton color="secondary" onClick={this.removeThumbsUp}><ThumbDownIcon style={{fontSize: 20}}/></StyledButton>
              </Box>
              <Box className="right" bgcolor="secondary.dark" padding="10px 10px 0px 10px">
                <Button color="black" onClick={this.deleteComment}>Delete</Button>
              </Box>
            </Box>

          </Box>
        </Fragment>
        )
    }
}

export default withStyles(useStyles) (Comment)
