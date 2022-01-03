import React, { useState } from "react";
import { Paper, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Auth, API } from 'aws-amplify';
import config from "UserPoolAmplify";
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import useStyles from "./useStylesInfraOver"

export default function Summary({ setInfraTotal }) {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState();
  const [next, setNext] = useState({ id: '"0"' });
  const [, setLoading] = useState(false);

  //TODO: Warning (Indicated below)
  const fetchdata = () => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0]

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: jwtToken
            },
            response: true,
            body: next
          }
          API.post(ApiData.name, "/infrastructure", options).then(res => {

            if (data) {
              setData(data.concat(res.data.data));
            } else setData(res.data.data);
            setNext({ id: res.data.next });

          }).catch(error => {
          }).finally(() => setLoading(true))

        });
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <main className={classes.layoutNode}>
      <Paper className={classes.paperNode} onClick={() => { history.push("components/Infrastructure/In") }}>
        <Grid container
          display="flex"
          direction="row"
          justify="center"
          alignItems="center"
          justifycontent="center"
          className={classes.graph}>

          <Grid container>
            <div className={classes.totalDiv}>
              <Grid item xs={12} className={classes.statistics}>
                <div className={classes.statisticsContent}>
                  <h1 className={classes.statisticHeading}>Total Nodes</h1>
                  <h1 className={classes.nodeHeading}>30</h1>
                </div>
              </Grid>
            </div>

            <div className={classes.totalDiv}>
              <Grid item xs={12} className={classes.statistics}>
                <SignalCellularAltIcon className={classes.signalIcon} />
                <div className={classes.statisticsContent}>
                  <h2 className={classes.statisticHeading}>Health</h2>
                  <h2 className={classes.heading1}>80%</h2>
                </div>
              </Grid>

              <Grid item xs={12} className={classes.statistics}>
                <TrendingUpIcon className={classes.signalIcon} />
                <div className={classes.statisticsContent}>
                  <h2 className={classes.statisticHeading}>Uptime</h2>
                  <h2 className={classes.heading1}>18hrs 26min</h2>
                </div>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </main >
  );
}
