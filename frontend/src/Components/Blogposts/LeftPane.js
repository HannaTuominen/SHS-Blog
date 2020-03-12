import React, { Fragment, Component } from 'react'
import EditTabs from './EditTabs'
import Paper from '@material-ui/core/Paper'
import PostText from './PostText'
import Route from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';

const ReadPost = <div><PostText/><PostText/></div>
const EditPost = () => <div><h3>Yeah</h3></div>

export default class extends Component{
  state = {index: 0}

  handleTabSelected = () => {
    if(this.state.index === 0){
      this.setState({ index: 1 })
    }else{
      this.setState({ index: 0 })
    }
  }

  render(){
    return <Fragment>
      <Paper>
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


