import React, { Component, Fragment } from 'react'
import { Header, Footer } from './Layouts'
import Blogpost from './Blogposts'
import { render } from '@testing-library/react'
import PostText from './Blogposts/PostText'
import { Box } from '@material-ui/core'


export default class extends Component {
  render() {
    return <Box bgcolor= "secondary.light"  height="100%" >
          <Header/>
          <Blogpost height="100%"/>
          <Footer />
    </Box>

  }
}

