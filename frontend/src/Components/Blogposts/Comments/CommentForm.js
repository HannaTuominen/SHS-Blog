import React, { Fragment, Component } from 'react'
import Box from '@material-ui/core/Box'

export default class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {

          comment: {
            name: "",
            message: ""
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

    /**
     * Form submit handler
     */
      onSubmit(e) {


          // persist the comments on server
          let { comment } = this.state;
//          fetch("api/saveComment", {
//            method: "post",
//            body: JSON.stringify(comment)
//          })
//            .then(res => res.json())
//            .then(res => {
//              if (res.error) {
//                this.setState({ loading: false, error: res.error });
//              } else {
                // add time return from api and push comment to parent state
//                comment.time = res.time;
//                this.props.addComment(comment);
//
                // clear the message box
                this.setState({
                  comment: { ...comment, message: "" }
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
                    className="form-control"
                    placeholder="Add comment here..."
                    name="message"
                    rows="5"
                  />
                </Box>

              {/*{this.renderError()}*/}

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