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
                            <h3 align="center">The specified services will be configured. You will be notified via email when this is complete.</h3>
                            <h4 align="center">Existing configured services will not be overridden.</h4>
                            <p align="center">In order to do this please update the service on the specific node.</p>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={12}>
                            <Button className={classes.edtSubmitBtn} 
                            onClick={() => { 
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
