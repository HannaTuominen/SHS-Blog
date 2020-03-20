import React, { Fragment, Component } from 'react'
import { withStyles }  from '@material-ui/core/styles'
import {Box, Typography} from '@material-ui/core'
import { borders } from '@material-ui/system';
import moment from "moment";

const useStyles = theme => ({
    left: {
      display: "inline",
    },
    right: {
      justifyContent: 'flex-end'
    }
});

function Comment(props) {
    const { name, message, time, parentPost } = props.comment
    return <Fragment>
        <Box bgcolor="primary.main">
        <Box bgcolor="secondary.main">
                <Typography className="left">{name}</Typography>
                <Typography className="right"> {moment(time).format('DD-MM-YYYY HH:MM')}</Typography>
            </Box>
            <Box padding="10px 10px 10px 10px">{message}    {parentPost}</Box>
        </Box>
      </Fragment>
}

export default withStyles(useStyles) (Comment)