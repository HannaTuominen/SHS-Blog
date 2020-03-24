import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import TextEditor from './TextEditor'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { renderToString } from 'react-dom/server'
import { convertToRaw, } from 'draft-js';
import {Editor, EditorState,} from 'draft-js'

const useStyles = theme => ({
  paper: {
    margin: "30px",
    padding: "30px",
    flex:0
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
  }
});

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = ({data : ''})
  }

  sendData(){
      const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
      const newText = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');

    fetch('api/add/',  {
          method: "post",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newText)
        })
          .then(this.doned(newText)).catch(err => console.log(err))
    }

    doned(newText){
        this.setState({'data' : newText})
        console.log(this.data.newText)
    }

render(){
  const { classes } = this.props;
    return <Paper className={classes.paper}>
            <TextEditor text='Dear diary, ' sendMethod={this.sendData.bind(this)}/>
            <Box display="flex">
                <Box className={classes.leftContainer}/>
                <Box>
                    <Button className={classes.btn}
//                        onClick={this.sendData.bind(this)}
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