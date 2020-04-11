import React, { Component, Fragment } from 'react'
import { Header, Footer } from './Layouts'
import { Box } from '@material-ui/core'
import BlogPost from "./Blogposts/BlogPost";
import AuthenticationService from '../service/AuthenticationService';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPost: {title: '', body: ''},
      postsData: [],
      currentComments: []
    }
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
      .then(data => this.setState({postsData: data}))
      .catch(this.serverError)
  }

  fetchPost = (id) => {
    console.log(this.state.postsData)
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
      if(this.state.postsData[i][1] === this.state.currentPostId){
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
      console.log(newPostId)
    }else if (!forward) {
      let newIndex = index
      if((index - 1) >= 0){
        newIndex = (index - 1)
      }
      newPostId = this.state.postsData[newIndex][1]
      this.changeId(newPostId);
      console.log(newPostId + '!!!!')
    }
  }

  render() {
    return <Box bgcolor= "secondary.light"  position="absolute">
      <Header/>
      <BlogPost height="100%"
                currentPost={this.state.currentPost}
                postsData={this.state.postsData}
                currentComments={this.state.currentComments}
                changeId={this.changeId}
                moveToNextPost={this.moveToNextPost}
                isUserLoggedIn={AuthenticationService.isUserLoggedIn()}
      />
      <Footer />
    </Box>
  }
}
