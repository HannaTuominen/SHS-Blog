import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import TextEditor from './TextEditor'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { renderToString } from 'react-dom/server'
import { convertToRaw, convertFromRaw } from 'draft-js';
import {Editor, EditorState,} from 'draft-js'
import axios from 'axios'
import {stateToHTML} from 'draft-js-export-html';

const useStyles = theme => ({
  paper: {
    padding: "10px 0px 30px 10px",
    margin: "30px 30px 0px 30px",
    flex:0,
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      margin: "0px",
      padding: "0px 10px 30px 10px",
    }
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btn: {
    flex: 0,
    margin: "30px 30px 0px 30px ",
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textField: {
    margin: "20px 30px 30px 30px ",
  }
});

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: "",
        body: "",
      },
      selectedFile:
        null,
      pic:
        null,
    }
  }

  editorState;

  sendData = () =>{
    let { post } = this.state;

//    let currentContent = this.editorState.getCurrentContent()
//    const blocks = convertToRaw(currentContent).blocks;
//    const raw = convertToRaw(currentContent);
//    const newText = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
     let html = stateToHTML(this.editorState.getCurrentContent())
    this.state.post.body = html;


    fetch('api/add/',  {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .catch(err => console.log(err))
  }

  callback = (newEditorState) => {
    this.editorState = newEditorState
  }

  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      post: {
        ...this.state.comment,
        [name]: value
      }
    })
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  showImage = () => {
  var imageDataUrl
    var fileName = this.state.selectedFile.name
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

  fileUploadHandler = event => {

    const formData = new FormData();
    formData.append('file', this.state.selectedFile)
    axios.post('api/uploadFile/', formData)
     .then(res => {console.log(res.data)})

     this.showImage()
  }

  render(){
    const { classes } = this.props;
    return <Paper className={classes.paper}>
       <Box className={classes.textField}>
        <TextField
          onChange={this.handleFieldChange}
          value={this.state.post.title}
          className="form-control"
          placeholder="Post title"
          name="title"
          type="text"
          fullWidth
        />
      </Box>
      <TextEditor text='Dear diary, ' callback={this.callback} imagesrc={this.state.pic}/>
      <Box display="flex">
        <Box className={classes.leftContainer}/>
        <Box>
          <input
            style={{display:'none'}}
            type="file"
            onChange={this.fileSelectedHandler}
            ref={fileInput => this.fileInput = fileInput}/>
          <Button className={classes.btn}
                  onClick={() => this.fileInput.click()}
                  size="large"
                  variant="contained"
                  color="secondary"
          > Choose image
          </Button>
          <Button className={classes.btn}
                  onClick={this.fileUploadHandler}
                  size="large"
                  variant="contained"
                  color="secondary"
          > Send (test)
          </Button>
          <Button className={classes.btn}
                  onClick={this.sendData}
                  size="large"
                  variant="contained"
                  color="secondary"
          > Create
          </Button>
        </Box>
      </Box>
      <img src={this.state.pic} />
    </Paper>
  }
}

export default withStyles(useStyles)(NewPost)
