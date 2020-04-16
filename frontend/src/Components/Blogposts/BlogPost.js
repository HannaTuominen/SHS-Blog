import React, {Component, Fragment} from 'react'
import EditTabs from './EditTabs';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
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
import Hamburger from "./Hamburger";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import  AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = theme => ({
  topGridItem: {
    padding: "15px 30px 0px 30px",
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'end'
  },
  topContainer: {
    borderRadius:5
   }
 });

class BlogPost extends Component {
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
    this.state = {currentPostId : 2, windowWidth: undefined}
  }

  changeId = (id) => {
    this.setState({currentPostId: id});
    this.props.changeId(id);
  }

  handleResize = () => this.setState({
    windowWidth: window.innerWidth
  });

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }


  render() {
    const { classes } = this.props;
    console.log(this.props.currentPost)

    return <Grid container>

      {this.state.windowWidth < 600 && <Hamburger currentPostId={this.state.currentPostId} idChangeCallback={this.changeId} dataCallback={this.postsDataUpdate}/>}

      <Grid item sm={12} className={classes.topGridItem}>

      <div style={{ width: '100%' }}>
        <Box bgcolor="secondary.main" className={classes.topContainer} display="flex" flexDirection="row-reverse">
          <Button
            size="large"
            variant="contained" disableElevation
            color="secondary"
            endIcon={<AddCircleOutlineIcon style={{ fontSize: 35 }}/>}
            onClick={() => history.push('/new')}
            > Create New Post
          </Button>
        </Box>
      </div>
      </Grid>

      <Grid item xs={12} sm={9}>
        <Router history={history}>
          <Switch>
            <Route exact path="/"
            render={(props) => <WelcomePane
              {...props}
              currentPost={this.props.currentPost}
              currentPostId={this.state.currentPostId}/>}
            />
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
      {this.state.windowWidth > 600 && <Grid item xs={12} sm={3}>
        <RightPane currentPostId={this.state.currentPostId} idChangeCallback={this.changeId} dataCallback={this.postsDataUpdate}/>
      </Grid> }
    </Grid>
  }
}

export default withStyles(useStyles)(BlogPost)

