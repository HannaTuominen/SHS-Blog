import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import PostText from './PostText'
import TextEditor from './TextEditor'
import { renderToString } from 'react-dom/server'

class EditPost extends Component {
  data;
  constructor(props) {
    super(props);
    this.state = ({text : ''})
    this.fetchPosts(props.currentPostId)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchPosts(nextProps.currentPostId)
  }

  callback = (newEditorState) => {
    this.editorState = newEditorState
  }

  fetchPosts = (id) => {
    fetch("/api/get/" + id).then(data => data.json()).then(this.updatePage).catch(err => console.log("Error fetching post"))
  }

  componentDidMount() {
    this.fetchPosts(this.props.currentPostId)
  }
  updatePage = (data) => {
    this.setState({text : data.body})
    this.data = data
  }

  render(){
    return <Fragment>
      <TextEditor text={this.props.currentPost} callback={this.callback}/>
    </Fragment>
  }
}

export default EditPost
