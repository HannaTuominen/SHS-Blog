import React, { Component, useState, useEffect } from "react";

class PostText extends Component {
  constructor(props) {
    super(props);
    this.fetchPosts()
    this.state = ({data : ''})
  }

  fetchPosts = () => {
    fetch("/api/get/" + this.props.currentPostId).then(data => data.json()).then(this.updatePage).catch(err => console.log("error"))
  }

  updatePage = (data) => {
    const newData = JSON.stringify(data)
    this.setState({'data' : newData})
  }

  render(){
    return <div>
        <span>{this.state.data}</span>
      </div>
  }
}

export default PostText