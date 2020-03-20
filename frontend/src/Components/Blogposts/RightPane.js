import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = theme => ({
  rightPane: {
    padding: "0 30px",
    height: "100%",
    width: "100%",
    position: "fixed"
  }
});

class RightPane extends Component {
  constructor(props) {
    super(props);
    this.state = ({data : ''})
    this.fetchPosts()
  }

  fetchPosts = () => {
    fetch('/api/getAllPosts/').then(data => data.json()).then(this.updatePage).catch(this.serverError)
  }

  serverError = (data) => {
    console.log('Server error while fetching posts data')
    console.log(data)
  }

  updatePage = (data) => {
    let items = [];
    for (let n = 0; n < data.length; n++) {
      items.push(<ListItem>
        <Link
          component="button"
          onClick={() => {
            this.props.callback(data[n][1])
          }}
          >
          {data[n][0]}
        </Link>
      </ListItem>)
    }
    this.setState({'data' : items})
  }

  render(){
    const { classes } = this.props;
    return <Fragment>
      <Paper className={classes.rightPane}>
        <List>Blog history</List>
        <ul>{this.state.data}</ul>
      </Paper>
    </Fragment>
  }

}

export default withStyles(useStyles) (RightPane)
