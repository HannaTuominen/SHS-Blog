import React, {Component, Fragment} from 'react'
import EditTabs from './EditTabs';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RightPane from './RightPane'
import ReadPost from './ReadPost'
import EditPost from './EditPost'
import NewPost from './NewPost'
import { Router, Switch, Route } from "react-router-dom";
import WelcomePane from './WelcomePane'
import history from './history'

export default class Blogpost extends Component {
  constructor(props) {
    super(props);
    this.state = {currentPostId : 2}
  }

  changeId = (id) => {
    this.setState({currentPostId: id})
  }

  render() {
    return <Grid container>
      <Grid item xs={12} sm={8}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={WelcomePane}/>
            <Route
              path="/read"
              render={(props) => <ReadPost {...props} currentPostId={this.state.currentPostId}/>}
            />
            <Route
              path="/edit"
              render={(props) => <EditPost {...props} currentPostId={this.state.currentPostId}/>}
            />
            <Route
              path="/new"
              render={(props) => <NewPost {...props} currentPostId={this.state.currentPostId}/>}
            />
          </Switch>
        </Router>
      </Grid>
      <Grid item xs={12} sm={4}>
        <RightPane currentPostId={this.state.currentPostId} callback={this.changeId}/>
      </Grid>
    </Grid>
  }
}
