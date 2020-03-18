import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'

const useStyles = theme => ({
  rightPane: {
    padding: "0 30px",
    height: 500
  },
});

class RightPane extends Component {
  constructor(props) {
    super(props);
    this.fetchPosts()
    this.state = ({data : ''})
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
      items.push(<li>{data[n][0]}</li>)
    }
    this.setState({'data' : items})
  }

  render(){
    const { classes } = this.props;
    return <Fragment>
      <Paper className={classes.rightPane}>
        <ul>{this.state.data}</ul>
      </Paper>
    </Fragment>
  }

}

export default withStyles(useStyles) (RightPane)
