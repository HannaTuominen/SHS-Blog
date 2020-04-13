import React, { Fragment, Component, useState } from 'react'
import ReactDOM from 'react-dom';
import {EditorState, RichUtils, ContentState, AtomicBlockUtils} from 'draft-js'
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
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
const imagePlugin = createImagePlugin();

class TextEditor extends Component {

  constructor(props) {
    super(props);
    let editorState;
    const contentState = ContentState.createFromText(this.props.text);
    editorState = EditorState.createWithContent(contentState);
    editorState = EditorState.moveFocusToEnd(editorState);

    this.state = {editorState: editorState};
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.props.callback(this.state.editorState)
  }

  onChange= (change) => {
    this.setState({editorState:change});
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

   _onHeaderClick() {
      this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'header-one'));
   }

    _onListClick() {
       this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
    }

  onImageClick(){
    const base64 = this.props.imagesrc;
    const newEditorState = this.insertImage(this.state.editorState, base64);
    this.setState({ editorState: newEditorState });
  }

  insertImage = (editorState, base64) => {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'image',
        'IMMUTABLE',
        { src: base64 },
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity },
      );
      return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    };

  render() {
    const { classes } = this.props;
    console.log(this.state.editorState)
    return (
      <div>
        <div className={classes.buttons}>
          <button onClick={this._onBoldClick.bind(this)}>Bold</button>
          <button onClick={this._onItalicClick.bind(this)}>Italic</button>
          <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>
          <button onClick={this._onHeaderClick.bind(this)}>Header</button>
          <button onClick={this._onListClick.bind(this)}>List</button>
          <button onClick={this.onImageClick.bind(this)}>Image</button>
        </div>
        <Editor className={classes.textEditor}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            plugins={[imagePlugin]}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(TextEditor)

