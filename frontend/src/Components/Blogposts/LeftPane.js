import React, { Fragment, Component } from 'react'
import EditTabs from './EditTabs'
import Paper from '@material-ui/core/Paper'
import PostText from './PostText'
import Typography from '@material-ui/core/Typography';
import TextEditor from './TextEditor'
import { withStyles }  from '@material-ui/core/styles'
import {Route, Link} from 'react-router-dom'


const useStyles = theme => ({
  leftPane: {
    padding: "0 30px",
    height: 500
  },
});

const ReadPost = () => <Typography  color="secondary" variant="h4" noWrap>You re in the ReadPost</Typography>
const EditPost = () => <Typography  color="secondary" variant="h4" noWrap>You re in the EditPost</Typography>

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
    return <Fragment>
      <Paper className={classes.leftPane}>
      <TextEditor/>
      <div><PostText/></div>
        <Route exact={true} path="/" component={ReadPost}/>
        <Route path="/editpost" component= {EditPost}/>
      <EditTabs
        onSelect={this.handleTabSelected}
        tabSelected={this.state.index}
      />
      </Paper>
    </Fragment>
  }
}

export default withStyles(useStyles)(LeftPane)


