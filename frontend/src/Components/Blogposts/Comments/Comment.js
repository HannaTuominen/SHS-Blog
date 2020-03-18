import React, { Fragment, Component } from 'react'
import { withStyles }  from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { borders } from '@material-ui/system';

const useStyles = theme => ({
  leftPane: {
    padding: "0 30px",
    height: 300,
  },
  commentBox: {
    padding: "30px"
  }
});

function Comment(props) {
    const { name, message, time, parentPost } = props.comment

    return <Fragment>
        <Box className="commentBox" border={1}>
            <small>{time}</small>
            <h6>{name}</h6>
            {message}
            {parentPost}
        </Box>
      </Fragment>
}

export default withStyles(useStyles) (Comment)