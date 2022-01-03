import React from "react";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Paper, Grid } from "@material-ui/core";
import useStyles from "./useStylesMonitoringServices";

export default () => {
    const classes = useStyles();
    const history = useHistory();

    return (
            <main className={classes.paper}>
                {/* <Paper className={classes.paper}> */}

                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >

                        <Grid item xs={12}>
                            <h3 align="center">Some nodes have not yet been configured.
                                                Please configure them and try again.</h3>

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
                                            pathname: "/MonitoringServices/ActivateServices",
                                            
                                        })
                                    }}>BACK</Button>
                        </Grid>
                    </Grid>
                {/* </Paper> */}

            </main>
    );
};
