import React, { Fragment } from 'react'
import EditTabs from './EditTabs';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LeftPane from './LeftPane'
import RightPane from './RightPane'

const styles = {
  Paper: {
    padding: 30
  }
}

function Blogpost() {
  return <Grid container md={12}>
    <Grid item md={8}>
      <LeftPane style={styles}/>
    </Grid>
    <Grid item md={4}>
      <RightPane style={styles}/>
    </Grid>

  </Grid>
}


export default Blogpost;