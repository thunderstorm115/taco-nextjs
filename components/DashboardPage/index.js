import React from 'react';
import Status from 'components/LoginPage/Status';
import useStyles from "./useStylesDash"  

export default () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* <TopToolbar/> */}
            <Status />
        </div>
    )
}