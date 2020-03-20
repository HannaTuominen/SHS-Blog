import React, { Fragment, Component } from 'react'
import {Box, Typography, TextField, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  textField: {
    width: '150px',
  },
}));


export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      loading: false,

      comment: {
        name: "",
        message: "",
        time: "",
        parentPost: 0

      }
    }
    // bind context to methods
    this.onSubmit = this.onSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    })
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  /**
   * Form submit handler
   */
  onSubmit(e) {
    // prevent default form submission
    e.preventDefault();

    // loading status and clear error
    this.setState({ error: "", loading: true });

    // persist the comments on server
    let { comment } = this.state;
    console.log(comment)
    comment.time = new Date()
    const currentPostId =  this.props.currentPostId

    comment.parentPost = currentPostId


    fetch('api/addComment/',  {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
      .then(this.props.addComment(comment)).catch(err => console.log(err))

    this.setState({ error: "", loading: false });
  }

  render() {
    return (
      <Fragment >

        <Box flexGrow={1} padding="10px 10px 10px 10px" bgcolor="primary.main" align="center">
          <Box  bgcolor="primary.main">
          <h5 align="center" >Make a comment</h5>
          </Box >
          <Box padding="10px 10px 10px 10px" bgcolor="white">
            <TextField
              onChange={this.handleFieldChange}
              value={this.state.comment.name}
              className="form-control"
              placeholder="Name"
              name="name"
              type="text"
              fullWidth
            />
          </Box>

          <Box bgcolor="white" padding="10px 10px 10px 10px">
                  <TextField
                    onChange={this.handleFieldChange}
                    value={this.state.comment.message}
                    className="textField"
                    placeholder="Add comment here..."
                    name="message"
                    fullWidth
                    multiline
                    rows="4"
                  />
          </Box>

          <Box padding="10px 10px 10px 10px">
            <Button disabled={this.state.loading} variant="outlined" color="secondary" onClick={this.onSubmit}>
              Add Comment
            </Button>
          </Box>
        </Box>
      </Fragment>
    );
  }
}