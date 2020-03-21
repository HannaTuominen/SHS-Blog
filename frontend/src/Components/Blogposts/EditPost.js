import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles }  from '@material-ui/core/styles'
import PostText from './PostText'
import TextEditor from './TextEditor'
import { renderToString } from 'react-dom/server'

class EditPost extends Component {
  constructor(props) {
    super(props);
  }


renderToString() {
     return renderToString(<PostText/>)
}

    render(){
    console.log(renderToString())
        return <Fragment>
                <TextEditor text='Dear diary, '/>
          </Fragment>
    }
}

export default EditPost