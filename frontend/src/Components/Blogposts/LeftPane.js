import React, { Fragment, Component } from 'react'
import EditTabs from './EditTabs'
import Paper from '@material-ui/core/Paper'
import PostText from './PostText'
import Route from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import TextEditor from './TextEditor'
import { withStyles }  from '@material-ui/core/styles'

const useStyles = theme => ({
  leftPane: {
    padding: "0 30px",
    height: 500
  },
});

const ReadPost = <div><PostText/><PostText/></div>
const EditPost = () => <div><h3>Yeah</h3></div>

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
      <div><PostText/><PostText/></div>
        {/* <BrowserRouter>
          <Route exact={true} path="/" component={ReadPost}/>
          <Route path="/editpost" component= {EditPost}/>
        </BrowserRouter> */}
      <EditTabs
        onSelect={this.handleTabSelected}
        tabSelected={this.state.index}
      />
      </Paper>
    </Fragment>
  }
}

export default withStyles(useStyles)(LeftPane)


