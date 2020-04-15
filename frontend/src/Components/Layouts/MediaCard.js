import React, { Fragment, Component } from 'react'
import { withStyles }  from '@material-ui/core/styles';
import img from '../../images/blogi_tausta4.png';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
    root: {
      maxWidth: 345,
      backgroundColor: theme.palette.primary.main
    },
    media: {
     height: 160
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
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={require('../../images/blogi_tausta4.png')}
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