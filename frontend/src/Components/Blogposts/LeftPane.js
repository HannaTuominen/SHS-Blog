import React, { Fragment, Component } from 'react'
import EditTabs from './EditTabs'
import Paper from '@material-ui/core/Paper'
import PostText from './PostText'
import ReadPost from './ReadPost'
import Typography from '@material-ui/core/Typography';
import EditPost from './EditPost'
import { withStyles }  from '@material-ui/core/styles'
import {Route, Link} from 'react-router-dom'


const useStyles = theme => ({
  leftPane: {
    padding: "0 30px",
    height: 500
  },
});

class LeftPane extends Component{

  state = {index: 0}

  handleTabSelected = () => {
    if(this.state.index === 0){
      this.setState({ index: 1 })
    }else{
      this.setState({ index: 0 })
    }
  }

  render(){
    const { classes } = this.props;
    const currentPostId = this.props.currentPostId
    return <Fragment>
        <EditTabs
                onSelect={this.handleTabSelected}
                tabSelected={this.state.index}
              />
        <Route exact={true} path="/" component= {ReadPost} currentPostId={currentPostId}/>
        <Route path="/editpost" component= {EditPost}/>

    </Fragment>
  }
}

export default withStyles(useStyles)(LeftPane)


