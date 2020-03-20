import React, { Fragment, Component } from 'react'
import { withStyles }  from '@material-ui/core/styles'
import {Box, Typography} from '@material-ui/core'
import { borders } from '@material-ui/system';
import moment from "moment";

const useStyles = theme => ({
  left: {
    display: "inline",
  },
  right: {
    justifyContent: 'flex-end'
  }
});

function Comment(props) {
  const { name, message, time, parentPost } = props.comment
  return <Fragment>
    <Box bgcolor="white" padding="10px 10px 10px 10px">
      <Box bgcolor="secondary.main" display="flex">
        <Box flexGrow={1} padding="10px 10px 10px 10px"><Typography className="left">{name}</Typography></Box>
        <Box padding="10px 10px 10px 10px"><Typography className="right"> {moment(time).format('DD-MM-YYYY HH:mm')}</Typography></Box>
      </Box>
      <Box padding="10px 10px 10px 10px" bgcolor="primary.main">
        <Typography ><pre style={{ fontFamily: 'inherit' }}>{message}    {parentPost} </pre></Typography>
      </Box>
    </Box>
  </Fragment>
}

export default withStyles(useStyles) (Comment)
