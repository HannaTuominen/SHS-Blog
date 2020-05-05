import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from "@material-ui/core/Box";
import history from './history'

const useStyles = theme => ({
  rightPane: {
    height: "100%",
    margin: "30px 30px 30px 0px",
    paddingTop: 10,
    flex: 0,
  },
  testStyle: {
      width:'100%'
  }
});

class RightPane extends Component {
  constructor(props) {
    super(props);
    this.state = ({data : ''})
    this.fetchPosts()
  }

  fetchPosts = () => {
    fetch('/api/getAllPosts/',{
      mode: 'no-cors', // 'cors' by default
      credentials: "same-origin"
    }).then(data => data.json()).then(this.updatePage).catch(this.serverError)
  }

  serverError = (data) => {
    console.log('Server error while fetching posts data')
    console.log(data)
  }

  updatePage = (data) => {
    let items = [];
    for (let n = 0; n < data.length; n++) {
      items.push(<ListItem key={n} alignItems="center">
        <Box flexGrow={1} align="center">
        <Link
          component="button"
          onClick={() => {
            this.props.idChangeCallback(data[n][1])
            history.push('/read');
          }}
          >
          {data[n][0]}
        </Link>
        </Box>
      </ListItem>)
    }
    this.setState({'data' : items});
    this.props.dataCallback(data);
  }

  render(){
    const { classes } = this.props;
    return <Fragment>
      <Paper className={classes.rightPane}>
            <h3 align="center">Blog history</h3>
            <Box>{this.state.data}</Box>
      </Paper>
    </Fragment>
  }

}

export default withStyles(useStyles) (RightPane)
