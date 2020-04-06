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
    this.setState({
        thumbsUp: this.state.thumbsUp + 1
    })
  }

  removeThumbsUp = () => {
    this.setState({
      thumbsUp: this.state.thumbsUp - 1
    })
  }

    render() {
      return (
        <Fragment>
          <Box bgcolor="white" padding="10px 10px 10px 10px">
            <Box bgcolor="secondary.dark" display="flex">
              <Box flexGrow={1} padding="10px 10px 10px 10px"><Typography className="left"> {moment(this.props.comment.time).format('DD-MM-YYYY HH:mm')}</Typography></Box>
              <Box  padding="10px 10px 10px 10px"><Typography className="left">{this.props.comment.name}</Typography></Box>
            </Box>
            <Box padding="10px 10px 10px 10px" bgcolor="secondary.light" display="flex">
              <Box flexGrow={1} padding="10px 10px 10px 10px">
                <Typography className="left"><pre style={{ fontFamily: 'inherit' }}>{this.props.comment.message}    {this.props.comment.parentPost} </pre></Typography>
              </Box>
            </Box>
            <Box bgcolor="secondary.dark" padding="0px 10px 0px 10px">
              <StyledButton color="secondary" onClick={this.addThumbsUp}><ThumbUpIcon style={{fontSize: 20}}/></StyledButton>
              <Typography style={{display: 'inline-block', padding: '10px 10px 10px 10px'}}><pre style={{ fontFamily: 'inherit' }}>{this.state.thumbsUp}</pre></Typography>
              <StyledButton color="secondary" onClick={this.removeThumbsUp}><ThumbDownIcon style={{fontSize: 20}}/></StyledButton>
            </Box>
          </Box>
        </Fragment>
        )
    }
}

export default withStyles(useStyles) (Comment)
