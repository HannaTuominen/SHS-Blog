import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import TextEditor from './TextEditor'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { renderToString } from 'react-dom/server'
import { convertToRaw, } from 'draft-js';
import {Editor, EditorState,} from 'draft-js'
import axios from 'axios'

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

    const blocks = convertToRaw(this.editorState.getCurrentContent()).blocks;
    const newText = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    this.state.post.body = newText;

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

  showImage = event => {
  var imageDataUrl
    axios.get('/api/downloadFile/face.png', { responseType:"blob" })
      .then(function (response) {
        var reader = new window.FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = function() {

         imageDataUrl = reader.result;
         console.log(imageDataUrl)
//          imageElement.setAttribute("src", imageDataUrl);
          document.getElementById("img1").src=imageDataUrl;
        }
      })
  }

  fileUploadHandler = event => {

    const formData = new FormData();
    formData.append('file', this.state.selectedFile)
    axios.post('api/uploadFile/', formData)
     .then(res => {console.log(res.data)})
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
      <TextEditor text='Dear diary, ' callback={this.callback}/>
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
          > Add image
          </Button>
          <Button className={classes.btn}
                  onClick={this.fileUploadHandler}
                  size="large"
                  variant="contained"
                  color="secondary"
          > Send (test)
          </Button>
          <Button className={classes.btn}
                            onClick={this.showImage}
                            size="large"
                            variant="contained"
                            color="secondary"
                    > Get image (test)
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
      <img id="img1" />
    </Paper>
  }
}

export default withStyles(useStyles)(NewPost)
