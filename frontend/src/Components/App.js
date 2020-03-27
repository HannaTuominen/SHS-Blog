import React, { Component, Fragment } from 'react'
import { Header, Footer } from './Layouts'
import { Box } from '@material-ui/core'
import BlogPost from "./Blogposts/BlogPost";


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPost: {title: '', body: ''},
      postsData: []
    }
  }

  componentDidMount() {
    this.fetchPosts()
    this.fetchPost(1)
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
    fetch("/api/get/" + id)
      .then(data => data.json())
      .then(data => this.setState({currentPost : data}))
      .catch(this.serverError)
  }

  serverError = (data) => {
    console.log(data)
  }

  changeId = (id) => {
    this.fetchPost(id);
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
    console.log(this.state.postsData)
    console.log(this.state.currentPost)
    return <Box bgcolor= "secondary.light"  position="absolute">
      <Header/>
      <BlogPost height="100%"
                currentPost={this.state.currentPost}
                postsData={this.state.postsData}
                changeId={this.changeId}
                moveToNextPost={this.moveToNextPost}
      />
      <Footer />
    </Box>
  }
}
