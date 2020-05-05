import React, { Component } from 'react'
import { Header, Footer } from './Layouts'
import { Box } from '@material-ui/core'
import BlogPost from "./Blogposts/BlogPost";
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AuthenticationService from '../service/AuthenticationService';

const theme = createMuiTheme({
    palette: {
        primary: {
          light: '#DBE0DC',
          main: '#9790a3',
          dark: '#DCD0C2',
          contrastText: '#fff',
        },
        secondary: {
          light: '#DBE0DC',
          main: '#A6BDB7',
          dark: '#8DA09B',
          contrastText: '#000',
        }
      },
//    palette: {
//        primary: { 500: '#E5E0DC' }, vaalea
//          #95A4BC   tumma sininen
//        secondary: '#ADBEDB' sininen
//         #817E8E   tumma harmahtava
//          #DCD0C2   vaalea beige
//          #EAEFEB   paper-tausta
//          #9790a3   tumma-lila
//          #A6BDB7   vaalea vihreä
//          #8DA09B   tumma vihreä
//    },
    typography: {
          fontFamily: '"Segoe UI"',
          textTransform: "none",
      }
})

const themeAlternative = createMuiTheme({
    palette: {
        primary: {
          light: '#D6ACE6',
          main: '#BAE74E',
          dark: '#875499',
          contrastText: '#875499',
        },
        secondary: {
          light: '#D6ACE6',
          main: '#BAE74E',
          dark: '#875499',
          contrastText: '#000',
        }
      },
    typography: {
          fontFamily: '"Segoe UI"',
          textTransform: "none",
      }
})


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPost: {id: '-1', title: '', body: '', imgSrc: ''},
      postsData: [],
      allPostsData: [],
      currentComments: [],
      isThemeDefault: true
    }
    this.fetchPosts();
  }

  componentDidMount() {
    this.updatePage()
  }

  updatePage() {
    fetch('/api/getAllPosts/',{
      mode: 'no-cors', // 'cors' by default
      credentials: "same-origin"
    }).then(data => data.json())
      .then(data => {
        this.fetchPost(data[data.length - 1][1]);
        this.setState({postsData: data})
      })
      .catch(this.serverError)
  }

  fetchPosts = () => {
    fetch('/api/getAllPosts/',{
      mode: 'no-cors', // 'cors' by default
      credentials: "same-origin"
    }).then(data => data.json())
      .then(data => this.setState({allPostsData: data}))
      .catch(this.serverError)
  }

  fetchPost = (id) => {
    console.log(this.state.postsData)
        this.state = {
          currentPost: {id: '-1', title: '', body: '', imgSrc: ''}}
    fetch("/api/get/" + id)
      .then(data => data.json())
      .then(data => this.setState({currentPost : data}))
      .catch(this.serverError)
  }

  fetchCurrentPostComments = (id) => {
    fetch("api/getComments/" + id)
      .then(data => data.json())
      .then(data => this.setState({currentComments : data}))
      .catch(this.serverError)
  }

  serverError = (data) => {
    console.log(data)
  }

  changeId = (id) => {
    this.fetchPost(id);
    this.fetchCurrentPostComments(id);
  }

  moveToNextPost = (forward) => {
    let index;
    let newPostId;
    for(let i = 0; i < this.state.postsData.length; i++){
      if(this.state.postsData[i][1] === this.state.currentPost.id){
        index = i
      }
    }
    if(forward){
      let newIndex = index
      if(index + 1 < this.state.postsData.length){
        newIndex = (index + 1)
      }
      newPostId = this.state.postsData[newIndex][1]
      this.changeId(newPostId)
    }else if (!forward) {
      let newIndex = index
      if((index - 1) >= 0){
        newIndex = (index - 1)
      }
      newPostId = this.state.postsData[newIndex][1]
      this.changeId(newPostId);
    }
  }

  onThemeChange = () => {
  if(this.state.isThemeDefault === true){
    this.setState({ isThemeDefault: false })
  }else{
    this.setState({ isThemeDefault: true })
  }
  }

  changeUserLogIn = (isLoggedIn) => {
    this.setState({ isLoggedIn: isLoggedIn })
  }

  render() {
    const { isThemeDefault } = this.state;
    return (
    <MuiThemeProvider theme={isThemeDefault ? theme : themeAlternative}>
    <Box bgcolor= "secondary.light" position="relative" minHeight="100vh">
      <Header
        isThemeDefault={this.state.isThemeDefault}
      />
      <Box paddingBottom="3.2rem">
        <BlogPost
          currentPost={this.state.currentPost}
          postsData={this.state.postsData}
          currentComments={this.state.currentComments}
          changeId={this.changeId}
          moveToNextPost={this.moveToNextPost}
          isUserLoggedIn={AuthenticationService.isUserLoggedIn()}
          changeUserLogIn={this.changeUserLogIn}
          allPostsData={this.state.allPostsData}/>
      </Box>

      <Box bottom="5" position="absolute" width="100%" height="3.2rem">
        <Footer
          changeTheme={this.onThemeChange}
          isUserLoggedIn={AuthenticationService.isUserLoggedIn()}
          changeUserLogIn={this.changeUserLogIn}
        />
      </Box>
    </Box>
    </MuiThemeProvider>)
  }
}
