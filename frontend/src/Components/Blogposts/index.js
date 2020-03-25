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

export default class Blogpost extends Component {
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
    this.setState({currentPostId: id})
  }

  moveToNextPost = (forward) => {
    let index;
    let newPostId;
      for(let i = 0; i < this.postsData.length; i++){
        if(this.postsData[i][1] === this.state.currentPostId){
            index = i
        }
      }
      if(forward){
        let newIndex = index
        if(index + 1 < this.postsData.length){
          newIndex = (index + 1)
        }
        newPostId = this.postsData[newIndex][1]
        this.changeId(newPostId)
        console.log(newPostId)
      }else if (!forward) {
        let newIndex = index
        if((index - 1) >= 0){
          newIndex = (index - 1)
        }
        newPostId = this.postsData[newIndex][1]
        this.changeId(newPostId)
        console.log(newPostId + '!!!!')
      }
  }

  render() {
    return <Grid container>
      <Grid item xs={12} sm={8}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={WelcomePane}/>
            <Route
              path="/read"
              render={(props) => <ReadPost {...props} currentPostId={this.state.currentPostId} callback={this.callback} idChangeCallback={this.changeId} moveToNextPost={this.moveToNextPost}/>}
            />
            <AuthenticatedRoute
              path="/edit" currentPostId={this.state.currentPostId} render={(props) => <EditPost {...props} currentPostId={this.state.currentPostId} currentPost={this.currentPostText}/>}
            />
            <Route
              path="/new"
              render={(props) => <NewPost {...props} currentPostId={this.state.currentPostId} />}
            />
            <Route
              path="/login"
              render={(props) => <LoginComponent {...props} currentPostId={this.state.currentPostId} />}
            />
            <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
          </Switch>
        </Router>
      </Grid>
      <Grid item xs={12} sm={4}>
        <RightPane currentPostId={this.state.currentPostId} idChangeCallback={this.changeId} dataCallback={this.postsDataUpdate}/>
      </Grid>
    </Grid>
  }
}
