import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
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
import  AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const useStyles = theme => ({
  topGridItem: {
    padding: "15px 30px 0px 30px",
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'end'
  },
  topContainer: {
    borderRadius:5
   },
  left: {
    display: "inline",
  },
  search: {
    width:'40%'
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
    this.state = {currentPostId : 2, windowWidth: undefined, blogPosts: [], tags: []}
    this.onTagsChange = this.onTagsChange.bind(this);
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

  onTagsChange = (event, values) => {
    this.setState({
      tags: values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state.tags);
    });
    // const id = values
    this.changeId(values.charAt(0));
    // history.push({pathname: '/read', state: { currentPostId: 5} });
  }


  render() {
    const { classes } = this.props;
    console.log(this.props.currentPost)
    console.log(this.props.allPostsData.map((option) => option[1]))
    return <Grid container>

      {this.state.windowWidth < 600 && <Hamburger currentPostId={this.state.currentPostId} idChangeCallback={this.changeId} dataCallback={this.postsDataUpdate}/>}
      <Grid item xs={12} sm={12}>
        <Box display="flex" >
          <Box flexGrow={1}></Box>
          <Box style={{ width:'20%'}} className="search">
            <Autocomplete
              MultiLine
              id="free-solo-2-demo"
              disableClearable
              options={this.props.allPostsData.map((option) => option[1] + "\n " + option[0])}
              onChange={this.onTagsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search posts"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}/>
              )}
            /></Box>
          <Box flexGrow={1}></Box>
        </Box>
      </Grid>

      {this.props.isUserLoggedIn ?
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
      </Grid>: void 0
      }

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
            <AuthenticatedRoute
              path="/new"
              render={(props) => <NewPost {...props} currentPostId={this.state.currentPostId} isUserLoggedIn={this.props.isUserLoggedIn} />}
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

