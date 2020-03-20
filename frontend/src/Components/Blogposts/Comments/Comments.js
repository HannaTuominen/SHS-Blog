import React, { Component } from "react";
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'

class Comments extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: false
    };
     this.addComment = this.addComment.bind(this);
  }
    componentDidMount() {
        // loading
        this.setState({ loading: true });
        this.fetching()
    }

        fetching = () => {
            // get all the comments
            fetch("api/getComments/1")
              .then(res => res.json())
              .then(res => {
                this.setState({
                  comments: res,
                  loading: false
                });
              })
              .catch(err => {
                this.setState({ loading: false });
              });
        }

      addComment(comment) {
          this.setState({
            loading: false,
            comments: [comment, ...this.state.comments]
      })
      }

  render() {
  const loadingSpin = this.state.loading ? "App-logo Spin" : "App-logo";
    return (
      <Box>
       {/*<img src={logo} className={loadingSpin} alt="logo" />*/}
        <Box className="row">
          <Box className="col-12  pt-3 border-right">
            <CommentForm addComment={this.addComment} fetching={this.fetching}/>
            <CommentList
               loading={this.state.loading}
               comments={this.state.comments}
            />
          </Box>

        </Box>
      </Box>
    );
  }
}

export default Comments