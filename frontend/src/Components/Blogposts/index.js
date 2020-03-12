import React, { Fragment } from 'react'
import EditTabs from './EditTabs';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LeftPane from './LeftPane'
import RightPane from './RightPane'

function Blogpost() {
  return <Grid container>
    <Grid item xs={12} sm={8}>
      <LeftPane/>
    </Grid>
    <Grid item xs={12} sm={4}>
      <RightPane/>
    </Grid>

  </Grid>
}


export default Blogpost;