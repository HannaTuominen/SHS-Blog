import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import PostText from './PostText'
import TextEditor from './TextEditor'
import { renderToString } from 'react-dom/server'

class EditPost extends Component {
  constructor(props) {
    super(props);
//    this.state = ({data : ''})
  }

// componentWillReceiveProps(nextProps) {
//    this.fetchPosts(nextProps.currentPostId)
//  }
//
//  fetchPosts = (id) => {
//    fetch("/api/get/" + id).then(data => data.json()).then(this.updatePage).catch(err => console.log("error"))
//  }
//
//  componentDidMount() {
//      this.fetchPosts(this.props.currentPostId)
//  }
//
//  updatePage = (data) => {
//    const newData = JSON.stringify(data.body)
//    this.setState({'data' : newData})
//  }

    render(){
    const currentPostId = this.props.currentPostId
//    const string1 = this.state.data
    const string2 = renderToString(<PostText/>);
    console.log(string2 + '!!!!')
        return <Fragment>
                <TextEditor text={string2}/>
          </Fragment>
    }
}

export default EditPost