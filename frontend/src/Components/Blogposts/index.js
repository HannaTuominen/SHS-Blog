import React, { Fragment } from 'react'
import EditTabs from './EditTabs';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LeftPane from './LeftPane'
import RightPane from './RightPane'
import ReadPost from './ReadPost'
import EditPost from './EditPost'
import { Router, Switch, Route } from "react-router-dom";
import WelcomePane from './WelcomePane'
import history from './history'

function Blogpost() {
    let currentPostId = 2;
  return <Grid container>
    <Grid item xs={12} sm={8}>
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={WelcomePane} />
                <Route
                    path="/read"
                    render= {(props) => <ReadPost {...props} currentPostId={currentPostId} />}
                />
                <Route
                    path="/edit"
                    render= {(props) => <EditPost {...props} currentPostId={currentPostId} />}
                />
            </Switch>
        </Router>
    </Grid>
    <Grid item xs={12} sm={4}>
      <RightPane/>
    </Grid>

  </Grid>
}


export default Blogpost;