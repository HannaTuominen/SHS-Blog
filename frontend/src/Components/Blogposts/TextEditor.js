import React, { Fragment, Component } from 'react'
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, ContentState} from 'draft-js'
import Paper from '@material-ui/core/Paper'
import { withStyles }  from '@material-ui/core/styles'
import './../../App.css';

const useStyles = theme => ({
  textEditor: {
    padding: "0 30px",
    height: 200
  },
});

class TextEditor extends Component {

    constructor(props) {
    super(props);
    let editorState;
    const contentState = ContentState.createFromText('Hello');
    editorState = EditorState.createWithContent(contentState);
    editorState = EditorState.moveFocusToEnd(editorState);

    this.state = {editorState: editorState};
    this.onChange = editorState => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
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
    return (
        <div>
            <Paper>
                <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                <button onClick={this._onItalicClick.bind(this)}>Italic</button>
                <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>
                <Editor className={classes.textEditor}
                  editorState={this.state.editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  onChange={this.onChange}
                />
            </Paper>
        </div>
    );
  }
}

export default withStyles(useStyles)(TextEditor)

