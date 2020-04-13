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
import AuthenticatedRoute from "../AuthenticatedRoute";
import LogoutComponent from "../LogoutComponent";
import LoginComponent from "../LoginComponent";
import {Box} from "@material-ui/core";

export default class BlogPost extends Component {
  currentPostText;
  callback = (post) => {
    this.currentPostText = post;
  }

  postsData = [];

  postsDataUpdate = (data) => {
  this.postsData = data;
  }

  constructor(props) {
    super(props);
    this.state = {currentPostId : 2}
  }

  changeId = (id) => {
    this.setState({currentPostId: id});
    this.props.changeId(id);
  }

  render() {
    console.log(this.props.currentPost)
    console.log("is user logged in: " + this.props.isUserLoggedIn );

    return <Grid container>
      <Grid item xs={12} sm={8}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={WelcomePane}/>
            <Route
              path="/read"
              render={(props) => <ReadPost
                {...props}
                currentPost={this.props.currentPost}
                currentPostId={this.state.currentPostId}
                moveToNextPost={this.props.moveToNextPost}
                isUserLoggedIn={this.props.isUserLoggedIn}/>}
            />
            <AuthenticatedRoute
              path="/edit" currentPostId={this.state.currentPostId} render={(props) => <EditPost {...props} currentPostId={this.state.currentPostId} currentPost={this.props.currentPost}/>}
            />
            <Route
              path="/new"
              render={(props) => <NewPost {...props} currentPostId={this.state.currentPostId} />}
            />
            <Route
              path="/login"
              render={(props) => <LoginComponent {...props} currentPostId={this.state.currentPostId} changeUserLogIn={this.props.changeUserLogIn} />}
            />
            <Route path="/logout" render={(props) => <LogoutComponent {...props} currentPostId={this.state.currentPostId}/>} />
          </Switch>
        </Router>
      </Grid>
      <Grid item xs={12} sm={4}>
        <RightPane currentPostId={this.state.currentPostId} idChangeCallback={this.changeId} dataCallback={this.postsDataUpdate}/>
      </Grid>
    </Grid>
  }
}
