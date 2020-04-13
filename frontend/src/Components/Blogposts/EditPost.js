import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import PostText from './PostText'
import TextEditor from './TextEditor'
import { renderToString } from 'react-dom/server'

const useStyles = theme => ({
  // paper: {
  //   padding: "10px 0px 30px 10px",
  //   margin: "30px 30px 0px 30px",
  //   flex:0
  // },
  // leftContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  // },
  // btn: {
  //   flex: 0,
  //   margin: "30px 30px 0px 30px ",
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // }
});

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
    fetch("/api/get/" + id,{
      mode: 'no-cors', // 'cors' by default
      credentials: "same-origin"
    }).then(data => data.json()).then(this.updatePage).catch(err => console.log("Error fetching post"))
  }

  componentDidMount() {
    this.fetchPosts(this.props.currentPostId)
  }
  updatePage = (data) => {
    this.setState({text : data.body})
    this.data = data
  }

  render(){
    const textEditorText = this.props.currentPost.body
    const textEditorTextNew = textEditorText.replace(/<[^>]*>?/gm, '')
    const { classes } = this.props;
    return <Fragment className={classes.paper}>
      <TextEditor text={textEditorTextNew} callback={this.callback}/>
    </Fragment>
  }
}

export default withStyles(useStyles)(EditPost)
