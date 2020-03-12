import React, { Fragment } from 'react'
import Paper from '@material-ui/core/Paper';


function RightPane(props) {
  return <Fragment>
    <Paper style={props.style.Paper}>
        <p>This is left pane</p>
    </Paper>
  </Fragment>
}

export default RightPane;