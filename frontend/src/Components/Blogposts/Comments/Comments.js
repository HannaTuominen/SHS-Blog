import React, { Component } from "react";
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

class Comments extends Component {

  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.state = {
      comments: [],
      loading: false
    };
  }
  addComment(comment) {
      this.setState({
        loading: false,
        comments: [comment, ...this.state.comments]
  })
  }
    componentDidMount() {
        // loading
        this.setState({ loading: true });

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

  render() {
  const loadingSpin = this.state.loading ? "App-logo Spin" : "App-logo";
    return (
    <MuiThemeProvider theme={theme}>
      <Box>
       {/*<img src={logo} className={loadingSpin} alt="logo" />*/}
        <Box className="row">
          <Box className="col-12  pt-3 border-right">
            <CommentForm addComment={this.addComment}/>
            <CommentList
               loading={this.state.loading}
               comments={this.state.comments}
            />
          </Box>

        </Box>
      </Box>
    </MuiThemeProvider>
    );
  }
}

export default Comments