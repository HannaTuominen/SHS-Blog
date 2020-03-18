import React, { Fragment, Component } from 'react'
import Box from '@material-ui/core/Box'
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
        this.setState({ error: ""/*, loading: true */});

          // persist the comments on server
          let { comment } = this.state;
          comment.time = new Date();
          comment.parentPost = 1
          fetch("api/addComment/", {
            method: "post",
             headers: {
                  'Content-Type': 'application/json'
                },
            body: JSON.stringify(comment)
          })
            .then(res => res.json())
            .then(res => {
              if (res.error) {
                this.setState({ /*loading: false,*/ error: res.error });
              } else {
                // add time return from api and push comment to parent state

                this.props.addComment(comment);
//
                // clear the message box
                this.setState({
                  comment: { ...comment, message: "" }
                })
             }
             })
            .catch(err => {
              this.setState({
                error: "Something went wrong while submitting form.",
//                loading: false
              });

            });
           }

      render() {
          return (
            <Fragment>
              <form method="post" onSubmit={this.onSubmit}>
                <Box>
                  <input
                    onChange={this.handleFieldChange}
                    value={this.state.comment.name}
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    type="text"
                  />
                </Box>

                <Box>
                  <textarea
                    onChange={this.handleFieldChange}
                    value={this.state.comment.message}
                    className="textField"
                    placeholder="Add comment here..."
                    name="message"
                    rows="5"
                  />
                </Box>

              {this.renderError()}

                <Box>
                  <button /*disabled={this.state.loading}*/>
                    Add Comment
                  </button>
                </Box>
              </form>
            </Fragment>
          );
       }
}