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
  postsId;

  callback = (post) => {
    this.currentPostText = post;
  }

  postsData = [];

  postsDataUpdate = (data) => {
    this.postsData = data;
  }

  constructor(props) {
    super(props);
    this.state = {
      currentPostId : 2,
      windowWidth: undefined,
      blogPosts: [],
      tags: []}
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
    const posts = this.props.allPostsData;
    for(let i = 0; i < posts.length; i++) {
      //this assumes all tittles are different so....
      if(posts[i].includes(values)) {
        this.changeId(posts[i][1]);
        break;
      }
    }

    history.push('/read');
  }

  makeIdArray(){
  console.log(this.props.allPostsData)
   let idArray = [];
   for(let i=0; i < this.props.allPostsData.length; i++){
        idArray[i] = this.props.allPostsData[i][1]
    }
    return idArray
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.currentPost)
    console.log(this.props.allPostsData.map((option) => option[1]));
    const posts = this.props.allPostsData;
    let idArray = this.makeIdArray()
    console.log("is user logged in: " + this.props.isUserLoggedIn );

    return <Grid container>

      {this.state.windowWidth < 600 && <Hamburger currentPostId={this.state.currentPostId} idChangeCallback={this.changeId} dataCallback={this.postsDataUpdate}/>}
      <Grid item xs={12} sm={12}>
        <Box display="flex" >
          <Box flexGrow={1}/>
          <Box style={{width: '250px', marginTop: 0, marginBottom: 0}}>
            <Autocomplete
              id="free-solo-2-demo"
              disableClearable
              options={posts.map((option) => option[0])}
              onChange={this.onTagsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search posts"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}/>
              )}/></Box>
          <Box flexGrow={1} />
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
              postsData={this.props.allPostsData}
              currentPostId={this.state.currentPostId}
              idChangeCallback={this.changeId}/>}
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

