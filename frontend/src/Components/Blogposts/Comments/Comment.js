import React, { Fragment, Component } from 'react'
import { withStyles }  from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = theme => ({
  leftPane: {
    padding: "0 30px",
    height: 300,
  },
});

function Comment(props) {
    const { name, message, time } = props.comment

    return <Fragment>
        <Box>
            <small>{time}</small>
            <h6>{name}</h6>
            {message}
        </Box>
      </Fragment>
}

export default withStyles(useStyles) (Comment)