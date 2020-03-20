import React, { Component, Fragment } from 'react'
import { Header, Footer } from './Layouts'
import Blogpost from './Blogposts'
import { render } from '@testing-library/react'
import PostText from './Blogposts/PostText'
import { Box } from '@material-ui/core'

export default class extends Component {
  render() {
    return <Box bgcolor= "secondary.light"
    >
          <Header/>
          <Blogpost/>
          <Footer />
    </Box>

  }
}

