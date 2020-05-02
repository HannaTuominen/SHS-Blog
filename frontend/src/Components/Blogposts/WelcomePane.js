import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper'
import MediaCard from './../Layouts/MediaCard'
import EditPost from './EditPost'
import { withStyles }  from '@material-ui/core/styles'
import  AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import history from './history'
import './../../App.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'

const useStyles = theme => ({
  welcome: {
    padding: "0px 0px 0px 30px",
    margin: "30px 30px 0px 0px",
    height: "100%",
    flex: 0,
    ['@media (max-width:1035px)']: { // eslint-disable-line no-useless-computed-key
      margin: "0px",
      padding: "30px 0px 0px 0px",
    },
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      margin: "0px",
      padding: "0px 0px 0px 0px",
    }
  },
  btn: {
    width: 205
  },
  leftContainer: {
      padding: "20px 0px 0px 30px",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
   },
});

class WelcomePane extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentPost : props.currentPost,
      posts: []
    }
  }

  componentDidMount() {
    axios.get('api/get/')
      .then(response => {
        this.setState( { posts: response.data } )
      })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentPost : nextProps.currentPost})
  }

  render(){
   const { classes } = this.props;
   const title = this.state.currentPost.title
   const text = this.state.currentPost.body

   let amountOfPosts = this.props.postsData.length
   let amountOfRows = amountOfPosts/3

   const postsCards = this.state.posts.map(post => {
      return <MediaCard currentPostTitle={post.title} currentPostText={post.body}/>
   })

//   let index = 0
////   var postsData = []
////   postsData[index] = this.props.postsData
//   while (index <= amountOfPosts) {
////     let index1 = postsData[index][0]
////     let rowsIndexes = [index1, index1, index1]
//     rows.push(<FormRow ids={2} />);
//     index += 3
//   }

  return (<div>
    <Box bgcolor="primary" className={classes.welcome} style={{display:'flex'}}>
      <Grid container spacing={4}>
        {postsCards}
      </Grid>
      <br/>
      <br/>
    </Box>
  </div>
  )}
}

export default withStyles(useStyles)(WelcomePane)