import React, { Component, Fragment } from 'react'
import { Header, Footer } from './Layouts'
import Blogpost from './Blogposts'
import { render } from '@testing-library/react'
import PostText from './Blogposts/PostText'

export default class extends Component {
  render() {
    return <Fragment>
      <Header/>
      <Blogpost/>
      <Footer />
    </Fragment>
  }
}

