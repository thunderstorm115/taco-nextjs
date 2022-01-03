import React from "react";
import TopToolbar from "components/DashboardPage/TopToolbar";
import {Portal,Button,Paper,Grid} from "@material-ui/core";
import finalLogo from "../../../../obs-cocoa-react/src/assets/TACOF.png";
import LogSupport from "components/Support/LogSupport";
import ConfigurationRequirements from "components/Support/ConfigurationRequirements";
import useStyles from './useStylesSupport';

const Support = () => {
  const classes = useStyles();
  const [log, setLog] = React.useState(false);
  const [custom, setCustom] = React.useState(false);

  React.useEffect(() => {
    if(log === true) {
        setLog(false);
    }

    if(custom === true) {
        setCustom(false);
    }
},[log, custom]);

  return (
    <div>
      <TopToolbar />
    <main className={classes.layout}>
      {log && <LogSupport />}
      {custom && <ConfigurationRequirements />}

      <img className="logo" src={finalLogo} alt="Obsidian logo" />

      <Paper className={classes.paper}>
        <h4 className={classes.loginTitle}> Log a Support Call</h4>
        <Button className={classes.button} onClick={() => setLog(!log)}>
          LOG SUPPORT
        </Button>
        <h4 className={classes.loginTitle}>
          Request a New Configuration Requirement
        </h4>
        <Button className={classes.button} onClick={() => setCustom(!custom)}>
          LOG REQUIREMENT
        </Button>
        <Portal />
        {}
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.supportForm}
        ></Grid>
      </Paper>
    </main>
    </div>
  );
};

export default Support;