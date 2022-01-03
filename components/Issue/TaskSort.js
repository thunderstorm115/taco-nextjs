import React, { useState, useEffect } from 'react';
import { Paper, Grid } from "@material-ui/core";
import useStyles from "./useStylesIssue";

export default ({ data }) => {
  const classes = useStyles();
  const [ ,setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    })();
  }, []);

  const mystyle = {
    color: "#9A2849",
  };

  //TODO: Warning (Unused variables for date)
  function timeSpent(first, date) {
  var d1 = new Date(date.slice(0, 19));
  var d2 = new Date(first.slice(0, 19));
  var date = new Date(d2-d1);
  var hour = date.getUTCHours();
  var min = date.getUTCMinutes();
  var sec = date.getUTCSeconds();
  var day = date.getUTCDate() - 1;

    return   hour + " Hrs " + min + " Min"
  }

  function msToHMS( millisec ) {

    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }
    else{
      hours = 0
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours !== "") {
        return hours + " Hrs " + minutes + " Min";
    }
    return hours + " Hrs " + minutes +" Min "+ seconds + " Sec";
}

  return (
    <>
      <Grid //Gloal grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.layout2}
      >

        <Grid //Card Grid
          container
          display="flex"
          alignItems="stretch"
          className={classes.graphTaskSort}
        >

          {data.map(item => (
            <Grid key={item} item xs={12} xl={6} sm={12} md={12} lg={6} onClick={() =>
            {console.log("item",item.issueKey);window.open("https://uat-jira-dc.obsidian.co.za/browse/" + item.issueKey)}}>
              <Paper className={classes.paper}>
                <h2>{item.issueKey}</h2>
                <div>
                  <Grid id="top-row" container>
                    <Grid item xs={8}>
                      <h4 style={mystyle}>ISSUE TYPE</h4>
                      <h4>{item.type === null ? "No Data" : item.type}</h4>
                    </Grid>
                    <Grid item xs={4}>
                      <h4 style={mystyle}>PRIORITY</h4>
                      <h4>{item.priority === null ? "No Data" : item.priority}</h4>
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <Grid id="top-row" container>
                    <Grid item xs={8}>
                      <h4 style={mystyle}>RESOLUTION</h4>
                      <h4>{item.resolution === null ? "No Data" : item.resolution}</h4>
                    </Grid>
                    <Grid item xs={4}>
                      <h4 style={mystyle}>STATUS</h4>
                      <h4>{item.status === null ? "No Data" : item.status}</h4>
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <Grid id="top-row" container>
                    <Grid item xs={12}>
                      <h4 style={mystyle}>SUMMARY</h4>
                      <h4>{item.summary === null ? "No Data" : item.summary}</h4>
                    </Grid>
                  </Grid>
                </div>
                <hr></hr>

                <div>
                  <Grid id="top-row" container>
                    <Grid item md={4} xs={8}>
                      <h4 style={mystyle}>TOTAL TIME SPENT</h4>
                      <h4>{item.spentTime === null ? "No Data" : msToHMS(item.spentTime) }</h4>
                    </Grid>
                    <Grid item md={4} xs={4} >
                      <h4 style={mystyle}>ASSIGNEE</h4>
                      <h4 style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>{item.theAsignee === null ? "No Data" : item.theAsignee}</h4>
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <h4 style={mystyle}>CONTRIBUTOR</h4>
                      <h4>{item.theContributer === null ? "No Data" : item.theContributer}</h4>
                    </Grid>
                  </Grid>
                </div>
                <hr></hr>
                <div>
                  <Grid id="top-row" container>
                    <Grid item md={4} xs={8}>
                      <h4 style={mystyle}>TIME TO FIRST RESPONSE</h4>
                      <h4 className={classes.timeFields}>{item.firstResponse ? "No Data" : timeSpent(item.firstResponse, item[0].datecreated)}</h4>
                      {/* <h4 className={classes.timeFields}>{item.firstResponse === null ? "" : item.firstResponse.substring(11, 19)}</h4> */}
                    </Grid>
                    <Grid item md={4} xs={4}>
                      <h4 style={mystyle}>TIME TO RESOLUTION</h4>
                      <h4 className={classes.timeFields}>{item.timeResolution === null ? "No Data" : timeSpent(item.timeResolution, item.datecreated)}</h4>
                      {/* <h4 className={classes.timeFields}>{item.timeResolution === null ? "" : item.timeResolution.substring(11, 19)}</h4> */}
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <h4 style={mystyle}>SLA STATUS</h4>
                      <h4>{item.status === null ? "No Data" : item.status}</h4>
                    </Grid>
                  </Grid>
                </div>

              </Paper>
            </Grid>

          ))}

        </Grid>
      </Grid>

    </>
  );
};
