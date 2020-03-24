import React, { Fragment, Component, useState } from 'react'
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, ContentState} from 'draft-js'
import Paper from '@material-ui/core/Paper'
import { withStyles }  from '@material-ui/core/styles'
import './../../App.css';

const useStyles = theme => ({
  textEditor: {
    margin: "30px",
    padding: "30px",
    flex:0
  },
  buttons: {
    margin: "0px 0px 5px 20px"
  }
});

class TextEditor extends Component {

  constructor(props) {
    super(props);
    let editorState;
    const contentState = ContentState.createFromText(this.props.text);
    editorState = EditorState.createWithContent(contentState);
    editorState = EditorState.moveFocusToEnd(editorState);

    this.state = {editorState: editorState};
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  onChange= (change) => {
    this.setState({change});
    this.props.callback(this.state.editorState)
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.editorState)
    return (
      <div>
        <div className={classes.buttons}>
          <button onClick={this._onBoldClick.bind(this)}>Bold</button>
          <button onClick={this._onItalicClick.bind(this)}>Italic</button>
          <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>
        </div>
        <Editor className={classes.textEditor}
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(TextEditor)

