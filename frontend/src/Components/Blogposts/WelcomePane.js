import React, { Fragment, Component } from 'react'
import Paper from '@material-ui/core/Paper'
import EditPost from './EditPost'
import { withStyles }  from '@material-ui/core/styles'
import  AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import history from './history'

const useStyles = theme => ({
  welcome: {
    padding: "50px 0px 0px 50px",
    height: 360,
    margin: "30px"
  },
  btn: {
    width: 205
  }
});

class WelcomePane extends Component{

  render(){
   const { classes } = this.props;
    return <div>
        <Paper className={classes.welcome}>
            <h1>Welcome, Friend!</h1>
            <Button className={classes.btn}
                size="large"
                variant="contained"
                color="secondary"
                startIcon={<MenuBookIcon style={{ fontSize: 35 }}/>}
                onClick={() => history.push('/read')}
              > Read Posts
            </Button>
            <br/>
            <br/>
            <Button
                size="large"
                variant="contained"
                color="secondary"
                startIcon={<AddCircleOutlineIcon style={{ fontSize: 35 }}/>}
                onClick={() => history.push('/edit')}
              > Create New Post
            </Button>
        </Paper>
    </div>
  }
}

export default withStyles(useStyles)(WelcomePane)