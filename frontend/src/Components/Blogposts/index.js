import React, { Fragment } from 'react'
import EditTabs from './EditTabs';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LeftPane from './LeftPane'
import RightPane from './RightPane'

function Blogpost() {
    let currentPostId = 2;
  return <Grid container>
    <Grid item xs={12} sm={8}>
      <LeftPane
        currentPostId={currentPostId}/>
    </Grid>
    <Grid item xs={12} sm={4}>
      <RightPane/>
    </Grid>

  </Grid>
}


export default Blogpost;