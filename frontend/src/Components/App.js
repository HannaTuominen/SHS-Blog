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

  render() {
    console.log(this.state.postsData)
    console.log(this.state.currentPost)
    return <Box bgcolor= "secondary.light"  position="absolute">
      <Header/>
      <BlogPost height="100%"/>
      <Footer />
    </Box>
  }
}
