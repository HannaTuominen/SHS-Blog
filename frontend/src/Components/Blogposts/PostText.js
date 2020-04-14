import React, { Component, useState, useEffect } from "react";
import axios from 'axios'

class PostText extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      data : props.currentPost.body,
      imgSrc: props.currentPost.imgSrc,
      pic: null
      })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data : nextProps.currentPost.body,
      imgSrc: nextProps.currentPost.imgSrc
      }, () => {
        if(this.state.imgSrc != null){
          this.showImage()
        }else{
        this.setState({pic: null})

        }
       });
  }

  showImage = () => {
    var imageDataUrl
      var fileName = this.state.imgSrc
      const _this = this
      axios.get('/api/downloadFile/' + fileName, { responseType:"blob" })
        .then(function (response) {
          var reader = new window.FileReader();
          reader.readAsDataURL(response.data);
          reader.onload = function() {
            imageDataUrl = reader.result;
           console.log(imageDataUrl)
           console.log(this)
           _this.setState({pic: imageDataUrl})
          }
        })
    }

  render(){
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: this.state.data}}/>
        <img src={this.state.pic} />
      </div>
    )
  }
}

export default PostText
