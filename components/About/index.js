import React from "react";
import {Paper, Grid} from "@material-ui/core";
import tacologonew from "../../../../obs-cocoa-react/src/assets/TACOF.png";
import TopToolbar from "components/DashboardPage/TopToolbar";
import useStyles from "./useStylesAbout";
//test
export default () => {
  const classes = useStyles();

  return (
    <div>
      <TopToolbar />
        <main className={classes.layout}>
          
          <Paper className={classes.paper2}>
            <h3 className="loginTitle2"> About </h3>  
          </Paper>

          <img className="logo" src={tacologonew} alt="Obsidian logo"/>

          <Paper className={classes.paper}>         
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              className={classes.about}
            >

              <Grid item xs={12}>
                <h3 align="center">Testing Automation Compliance Observability</h3>
                <h5> TACO can apply and monitor auditing policies across all infrastructure environments. <br/><br/>
                Testing Automation Compliance Observability (TACO) is a continuous compliance auditing tool that provides visibility on a compliance and infrastructure dashboard.
                The compliance auditing metrics provides you, at a glance, a real-time view of your overall infrastructure compliance status in a single dashboard.<br/><br/>
                Automation of continuous compliance auditing allows best in class governance practices without hindering agile requirements.
                TACO can apply auditing policies to your organisation’s overall infrastructure environment.
                TACO covers compliance frameworks like CIS, POPI and GDPR, to name a few. </h5>
              </Grid>

            </Grid> 
          </Paper>
        </main>
    </div>
  );
};