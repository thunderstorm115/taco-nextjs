import React from "react";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import useStyles from "./useStylesNodeMan";

export default () => {
const classes = useStyles();
const history = useHistory();

return (
    <main className={classes.paper}>
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid item xs={12}>
                <h3 align="center">The specified nodes will be deleted.
                    You will be notified via email when this is complete.</h3>
            </Grid>
        </Grid>

        <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid item xs={12}>
                <Button className={classes.edtSubmitBtn} onClick={() => { 
                    history.push({
                        pathname: "/nodeManagement",
                    })
                }}>BACK</Button>
            </Grid>
        </Grid>
    </main>
    );
};
