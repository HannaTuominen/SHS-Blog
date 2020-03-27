import React, { Component, Fragment } from 'react'
import { Header, Footer } from './Layouts'
import { Box } from '@material-ui/core'
import BlogPost from "./Blogposts/BlogPost";


export default class extends Component {
  postsData = [];

  fetchPosts = () => {
    fetch('/api/getAllPosts/',{
      mode: 'no-cors', // 'cors' by default
      credentials: "same-origin"
    }).then(data => data.json()).then(this.updatePostsData).catch(this.serverError)
  }

  serverError = (data) => {
    console.log('Server error while fetching posts data')
    console.log(data)
  }

  updatePostsData = (data) => {
    this.postsData = data;
  }

  render() {
    return <Box bgcolor= "secondary.light"  position="absolute">
      <Header/>
      <BlogPost height="100%"/>
      <Footer />
    </Box>

  }
}
