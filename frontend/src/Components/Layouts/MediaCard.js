import React, { Fragment, Component } from 'react'
import { withStyles }  from '@material-ui/core/styles';
import img from '../../images/blogi_tausta4.png';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import history from "../Blogposts/history";
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
    root: {
      maxWidth: 340,
      textAlign:'center'
    },
    media: {
     height: 160,
     width: 160,
     borderRadius:160/2,
     marginLeft:(340-160)/2,
     marginRight:(340-160)/2,
     marginTop:10
    },
});

class MediaCard extends Component {
  constructor(props) {
    super(props);
    }

  render(){
    const { classes } = this.props;
    return (
    <div>
      <Card className={classes.root}>
        <CardActionArea
          onClick={() => history.push('/read')}>
          <CardMedia
            className={classes.media}
            image={require('../../images/blog_card_placeholder.png')}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.currentPostTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.currentPostText}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Read post
          </Button>
        </CardActions>
      </Card>
    </div>
  )}
 }


export default withStyles(useStyles) (MediaCard)