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
      }
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
          <Button className={classes.btn}
                  onClick={this.sendData}
                  size="large"
                  variant="contained"
                  color="secondary"
          > Create
          </Button>
        </Box>
      </Box>
    </Paper>
  }
}

export default withStyles(useStyles)(NewPost)
