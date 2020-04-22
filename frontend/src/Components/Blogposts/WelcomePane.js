import React, { Component } from 'react'
import MediaCard from './../Layouts/MediaCard'
import { withStyles }  from '@material-ui/core/styles'
import './../../App.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

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
    this.state = {currentPost : props.currentPost}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentPost : nextProps.currentPost})
  }

  render(){
   const { classes } = this.props;
   const title = this.state.currentPost.title
   const text = this.state.currentPost.body

    return <div>
        <Box bgcolor="primary" className={classes.welcome}>
            <Grid container className={classes.root} spacing={3}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                  {[0, 1, 2].map((value) => (
                    <Grid key={value} item>
                      <MediaCard
                        currentPostText={text}
                        currentPostTitle={title}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                  {[0, 1, 2].map((value) => (
                    <Grid key={value} item>
                      <MediaCard
                        currentPostText={text}
                        currentPostTitle={title}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>

            <br/>
            <br/>
        </Box>
    </div>
  }
}

export default withStyles(useStyles)(WelcomePane)