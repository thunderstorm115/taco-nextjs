import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Grid, Paper, Button } from "@material-ui/core";
import { API } from 'aws-amplify';
import config from "UserPoolAmplify";
import useStyles from "./useStylesIssue";
import Spinner from "../User/Spinner";

const JiraIssuesOverview = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState([]);
  const [issues, setIssues] = useState(true)
  const [incidents, setIncidents] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0]
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
          const { idToken } = session;

          let jwtToken = idToken.jwtToken;

          const options = {
            headers: {
              Authorization: jwtToken
            }
          }

          API.get(ApiData.name, `/jira/sla-overview`, options).then(res => {
            setSummary(res);
            setLoading(true)
          }).catch(error => {
            console.log(error.response)
          }).finally(() => setLoading(true))
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function timeSpent(first, date) {
    var d1 = new Date(date.slice(0, 19));
    var d2 = new Date(first.slice(0, 19));
    var date = new Date(d2 - d1);
    var hour = date.getUTCHours();
    var min = date.getUTCMinutes();
    return hour + " Hrs " + min + " Min"
  }

  function msToHMS(millisec) {
    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "";
    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      hours = (hours >= 10) ? hours : "0" + hours;
      minutes = minutes - (hours * 60);
      minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }
    else {
      hours = 0
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours !== "") {
      return hours + " Hrs " + minutes + " Min";
    }
    return hours + " Hrs " + minutes + " Min " + seconds + " Sec";
  }

  function toggleIssues() {
    setIssues(true)
    setIncidents(false)
  }

  function toggleIncidents() {
    setIssues(false)
    setIncidents(true)
  }

  function reset() {
    setIssues(true)
    setIncidents(true)
  }

  const mystyle = {
    color: "#9A2849",
  };

  return (
    <div>
      {loading === false ? <Spinner /> :
        <main className={classes.layoutSLA}>
          <div>
            <Button className={classes.buttonSLA1} style={{ 'color': issues === true ? 'white' : '#A4A4A4' }} onClick={toggleIssues}>Jira Issues</Button>
            <Button className={classes.buttonSLA2} style={{ 'color': incidents === true ? 'white' : '#A4A4A4' }} onClick={toggleIncidents}>Jira Incidents</Button>
            <Button className={classes.buttonSLA2} style={{ 'color': 'white' }} onClick={reset}>Reset</Button>
          </div>

          {loading === false ? <Spinner /> :
            summary ? 
            <div>
              <h2 className={classes.headingSLA}>Latest Jira Issues Logged</h2>
              <Grid //Gloal grid
                container
                direction="column"
                justify="center"
              >
                {summary.Issues === undefined ? <h3 className={classes.noData}>No Data. One or more Jira Service keys may be invalid.</h3> :
                <Grid //Card Grid
                  container
                  display="flex"
                  alignItems="stretch"
                >
                  {summary.Issues < 1 ? 
                  <Grid //Gloal grid
                    container
                    direction="column"
                    className={classes.layout2}>
                    <h3 className={classes.noData}>No Data</h3>
                  </Grid> : null}

                  {summary.Issues.map(item => (
                    // {console.log('id:', item.id)}
                    <Grid key={item.issueKey} item xs={12} xl={6} sm={12} md={12} lg={6} onClick={() => window.open("https://uat-jira-dc.obsidian.co.za/browse/" + item.issueKey)}>
                      <Paper className={classes.paperSLA}>
                        <h2 className={classes.cardTitle}>{item.issueKey}</h2>

                        <div>
                          <Grid id="top-row" container>
                            <Grid item xs={8}>
                              <h4 style={mystyle}>ISSUE TYPE</h4>
                              <h4 className={classes.noBold}>{item.type === null ? "No Data" : item.type}</h4>
                            </Grid>

                            <Grid item xs={4}>
                              <h4 style={mystyle}>PRIORITY</h4>
                              <h4 className={classes.noBold}>{item.priority === "" || null ? "No Data" : item.priority}</h4>
                            </Grid>
                          </Grid>
                        </div>
                        
                        <div>
                          <Grid id="top-row" container>
                            <Grid item xs={8}>
                              <h4 style={mystyle}>RESOLUTION</h4>
                              <h4 className={classes.noBold}>{item.resolution === "" ? "No Data" : item.resolution}</h4>
                            </Grid>

                            <Grid item xs={4}>
                              <h4 style={mystyle}>STATUS</h4>
                              <h4 className={classes.noBold}>{item.status2 === null ? "No Data" : item.status2}</h4>
                            </Grid>
                          </Grid>
                        </div>

                        <div>
                          <Grid id="top-row" container>
                            <Grid item xs={12}>
                              <h4 style={mystyle}>SUMMARY</h4>
                              <h4 className={classes.noBold}>{item.summary === null ? "No Data" : item.summary}</h4>
                            </Grid>
                          </Grid>
                        </div>

                        <hr></hr>

                        <div>
                          <Grid id="top-row" container>
                            <Grid item md={4} xs={8}>
                              <h4 style={mystyle}>TOTAL TIME SPENT</h4>
                              <h4 className={classes.noBold}>{item.spentTime === null ? "No Data" : msToHMS(item.spentTime)}</h4>
                            </Grid>

                            <Grid item md={4} xs={4} >
                              <h4 style={mystyle}>ASSIGNEE</h4>
                              <h4  className={classes.noBold} style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{item.theAsignee === null ? "No Data" : item.theAsignee}</h4>
                            </Grid>
                            
                            <Grid item md={4} xs={6}>
                              <h4 style={mystyle}>CONTRIBUTOR</h4>
                              <h4 className={classes.noBold}>{item.theContributer === null ? "No Data" : item.theContributer}</h4>
                            </Grid>
                          </Grid>
                        </div>

                        <hr></hr>

                        <div>
                          <Grid id="top-row" container>
                            <Grid item md={4} xs={8}>
                              <h4 style={mystyle}>TIME TO FIRST RESPONSE</h4>
                              <h4 className={classes.noBold}>{item.firstResponse === null ? "No Data" : timeSpent(item.firstResponse, item.datecreated)}</h4>
                              {/* <h4 className={classes.noBold}>{item.firstResponse === null ? "" : item.firstResponse.substring(11, 19)}</h4> */}
                            </Grid>

                            <Grid item md={4} xs={4}>
                              <h4 style={mystyle}>TIME TO RESOLUTION</h4>
                              <h4 className={classes.noBold}>{item.timeResolution === null ? "No Data" : timeSpent(item.timeResolution, item.datecreated)}</h4>
                              {/* <h4 className={classes.noBold}>{item.timeResolution === null ? "" : item.timeResolution.substring(11, 19)}</h4> */}
                            </Grid>

                            <Grid item md={4} xs={6}>
                              <h4 style={mystyle}>SLA STATUS</h4>
                              <h4 className={classes.noBold}>{item.status2 === null ? "No Data" : item.status2}</h4>
                            </Grid>
                          </Grid>
                        </div>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                }
              </Grid>
                  
            </div> : null }

          {loading === false ? <Spinner /> :
            summary ? <div>
              <h2 className={classes.headingSLA}>Latest Incidents Logged</h2>
              <Grid //Gloal grid
                container
                direction="column"
                alignItems="left"
                justify="center"
              >
              { summary.Incidents === undefined ? <h3 className={classes.noData}>No Data. One or more Jira Service keys may be invalid.</h3> :
                <Grid //Card Grid
                  container
                  display="flex"
                  alignItems="stretch"
                >
                  {summary.Incidents < 1 ? <Grid //Gloal grid
                    container
                    direction="column"
                    className={classes.layout2}>
                    <h3 className={classes.noData}>No Data</h3>
                  </Grid> : null}

                  {summary.Incidents.map(item => (
                    // {console.log('id:', item.id)}
                    <Grid key={item.issueKey} item xs={12} xl={6} sm={12} md={12} lg={6} onClick={() => window.open("https://uat-jira-dc.obsidian.co.za/browse/" + item.issueKey)}>
                      <Paper className={classes.paperSLA}>
                        <h2>{item.issueKey}</h2>
                        <div>
                          <Grid id="top-row" container>
                            <Grid item xs={8}>
                              <h4 style={mystyle}>ISSUE TYPE</h4>
                              <h4 className={classes.noBold}>{item.type === null ? "No Data" : item.type}</h4>
                            </Grid>
                            <Grid item xs={4}>
                              <h4 style={mystyle}>PRIORITY</h4>
                              <h4 className={classes.noBold}>{item.priority === "" || null ? "No Data" : item.priority}</h4>
                            </Grid>
                          </Grid>
                        </div>
                        <div>
                          <Grid id="top-row" container>
                            <Grid item xs={8}>
                              <h4 style={mystyle}>RESOLUTION</h4>
                              <h4 className={classes.noBold}>{item.resolution === "" ? "No Data" : item.resolution}</h4>
                            </Grid>
                            <Grid item xs={4}>
                              <h4 style={mystyle}>STATUS</h4>
                              <h4 className={classes.noBold}>{item.status2 === null ? "No Data" : item.status2}</h4>
                            </Grid>
                          </Grid>
                        </div>
                        <div>
                          <Grid id="top-row" container>
                            <Grid item xs={12}>
                              <h4 style={mystyle}>SUMMARY</h4>
                              <h4 className={classes.noBold}>{item.summary === null ? "No Data" : item.summary}</h4>
                            </Grid>
                          </Grid>
                        </div>
                        <hr></hr>

                        <div>
                          <Grid id="top-row" container>
                            <Grid item md={4} xs={8}>
                              <h4 style={mystyle}>TOTAL TIME SPENT</h4>
                              <h4 className={classes.noBold}>{item.spentTime === null ? "No Data" : msToHMS(item.spentTime)}</h4>
                            </Grid>
                            <Grid item md={4} xs={4} >
                              <h4 style={mystyle}>ASSIGNEE</h4>
                              <h4 className={classes.noBold} style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{item.theAsignee === null ? "No Data" : item.theAsignee}</h4>
                            </Grid>
                            <Grid item md={4} xs={6}>
                              <h4 style={mystyle}>CONTRIBUTOR</h4>
                              <h4 className={classes.noBold}>{item.theContributer === null ? "No Data" : item.theContributer}</h4>
                            </Grid>
                          </Grid>
                        </div>
                        <hr></hr>
                        <div>
                          <Grid id="top-row" container>
                            <Grid item md={4} xs={8}>
                              <h4 style={mystyle}>TIME TO FIRST RESPONSE</h4>
                              <h4 className={classes.noBold}>{item.firstResponse === null ? "No Data" : timeSpent(item.firstResponse, item.datecreated)}</h4>
                              {/* <h4 className={classes.noBold}>{item.firstResponse === null ? "" : item.firstResponse.substring(11, 19)}</h4> */}
                            </Grid>
                            <Grid item md={4} xs={4}>
                              <h4 style={mystyle}>TIME TO RESOLUTION</h4>
                              <h4 className={classes.noBold}>{item.timeResolution === null ? "No Data" : timeSpent(item.timeResolution, item.datecreated)}</h4>
                              {/* <h4 className={classes.noBold}>{item.timeResolution === null ? "" : item.timeResolution.substring(11, 19)}</h4> */}
                            </Grid>
                            <Grid item md={4} xs={6}>
                              <h4 style={mystyle}>SLA STATUS</h4>
                              <h4 className={classes.noBold}>{item.status2 === null ? "No Data" : item.status2}</h4>
                            </Grid>
                          </Grid>
                        </div>

                      </Paper>
                    </Grid>

                  ))}

                </Grid>
                }
              </Grid>
            </div> :  <div className={classes.centerDiv}><h2 className={classes.NoDataText}>No Data</h2></div> }
        </main>}
    </div>
  );
};

export default JiraIssuesOverview;