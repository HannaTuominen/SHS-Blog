import React, { Component, useState, useEffect } from "react";

class PostText extends Component {
  constructor(props) {
    super(props);
    this.fetchPosts(this.props.currentPostId)
    this.state = ({data : ''})
  }

  componentWillReceiveProps(nextProps) {
    this.fetchPosts(nextProps.currentPostId)
  }

  fetchPosts = (id) => {
    fetch("/api/get/" + id).then(data => data.json()).then(this.updatePage).catch(err => console.log("error"))
  }

  updatePage = (data) => {
    const newData = JSON.stringify(data.body)
    this.setState({'data' : newData})
    this.props.callback(newData)
  }

  render(){
    return this.state.data
  }
}

export default PostText
