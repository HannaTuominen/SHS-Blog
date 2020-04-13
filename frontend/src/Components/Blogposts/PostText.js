import React, { Component, useState, useEffect } from "react";

class PostText extends Component {
  constructor(props) {
    super(props);
    this.state = ({data : props.currentPost.body})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data : nextProps.currentPost.body})
  }

  render(){
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: this.state.data}}/>
      </div>
    )
  }
}

export default PostText
