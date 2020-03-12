import React from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export default ({ tabSelected, onSelect }) =>{
  return <Paper>
      <Tabs
        value={tabSelected}
        onChange={onSelect}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
      <Tab label="Read post" />
      <Tab label="Edit post" />
    </Tabs>
  </Paper>
}

