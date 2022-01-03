import React from 'react';
import {Backdrop, CircularProgress} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
export default function Spinner({text}) {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
        {text && <span>{text}</span>}
      </Backdrop>
    </div>
  );
}