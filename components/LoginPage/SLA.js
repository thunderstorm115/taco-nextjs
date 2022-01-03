import React, { useState, useEffect } from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { Line, Doughnut, Bar } from "react-chartjs-2";
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { Auth, API } from 'aws-amplify';
import config from "UserPoolAmplify";
import Spinner from "../User/Spinner";
import useStyles from "./useStylesLogin";
import { useHistory } from "react-router-dom";

export default (props) => {
  const classes = useStyles();
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [slaAlmostOut, setSlaAlmostOut] = useState(true)
  const [slaOut, setSlaOut] = useState(true);
  const [slaDetails, setSlaDetails] = useState();
  const history = useHistory();

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
          API.get(ApiData.name, `/jira/sla-summary`, options).then(res => {
            setSlaDetails(res)
          }).catch(error => {
            console.log(error.response)
          }).finally(() => { setLoadingDetails(false) })
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const mystyle = {
    color: "#9A2849",
  };

  function timeSpent(first, second) {
    var d1 = new Date(second ? second.slice(0, 19) : null);
    var d2 = new Date(first ? first.slice(0, 19) : null);
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

  function toggleOut() {
    setSlaOut(true)
    setSlaAlmostOut(false)
  }
  function toggleAlmostOut() {
    setSlaOut(false)
    setSlaAlmostOut(true)
  }
  function reset() {
    setSlaOut(true)
    setSlaAlmostOut(true)
  }

  return (
    <div>
      {loadingDetails ? <Spinner /> :
        <main>
          <Grid container className={classes.authGrid}>
          {slaDetails ?
              <>
            <Grid container item xs={12} md={6} lg={6} className={classes.authContactsGrid} onClick={() => history.push("/sla/overview/auth-users")}>
              <Grid item xs={6} md={6} lg={6}>
                <h2 className={classes.headingAuth}>Authorised Contacts</h2>
                <RecordVoiceOverIcon className={classes.icons}/>
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <h1 className={classes.statisticHeading2}>Total</h1>
                <h2 className={classes.heading2}>{slaDetails.contacts}</h2>
              </Grid>
            </Grid>

            <Grid container item xs={12} md={6} lg={6} className={classes.issueDetailsGrid} onClick={() => history.push("/sla/overview/jiraissues")}>
              <Grid item xs={6} md={6} lg={6}>
                <h2 className={classes.headingAuth}>Issue Details</h2>
                <ErrorIcon className={classes.icons}/>
              </Grid>
              
              <Grid item xs={5} md={6} lg={6}>
                <Grid>
                  <h1 className={classes.statisticHeading2}>Status</h1>
                  <Grid className={classes.issueContainerSub}>
                    <Grid item xs={6} md={6} lg={6}>
                        <h3 className={classes.heading3SLA}>To Do</h3>
                        <h3 className={classes.heading3SLA}>Progress</h3>
                      <h3 className={classes.heading3SLA}>Review</h3>
                        <h3 className={classes.heading3SLA}>Done</h3>
                    </Grid>

                    <Grid item xs={7} md={6} lg={6} className={classes.issueDetails}>
                      <h3 className={classes.heading3SLA}>{slaDetails.stat.todo !== "None" ? slaDetails.stat.todo : "0"}</h3>
                      <h3 className={classes.heading3SLA}>{slaDetails.stat.progress !== "None" ? slaDetails.stat.progress : "0"}</h3>
                      <h3 className={classes.heading3SLA}>{slaDetails.stat.review !== "None" ? slaDetails.stat.review : "0"}</h3>
                      <h3 className={classes.heading3SLA}>{slaDetails.stat.done !== "None" ? slaDetails.stat.done : "0"}</h3>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            </> : null}
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {slaDetails ? <div>
              <Grid className={classes.graphNode}>
                <Grid onClick={() => history.push("/sla/overview/jiraissues")}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center">
                  <Grid item xs={12} md={10} lg={11}><h2 className={classes.headingAuth}>SLA Metrics</h2></Grid>
                  <Grid item xs={12} md={2} lg={1}> <Button onClick={() => history.push("/sla/overview/jiraissues")} variant="contained"
                    className={classes.moreInfoBtn}>More Info</Button></Grid>
                </Grid>

                <Grid container className={classes.graphContainer}>
                  <Grid item xs={12} md={12} lg={4} className={classes.graphGridSLA}>
                    <h3 className={classes.heading4SLA} onClick={() => history.push("/sla/overview/jiraissues")}>Amount & Type of Issues</h3>
                    <Doughnut
                      data={{
                        labels: slaDetails ? [`Alert`, `Maintenance`, `Support`, `Task`] : null,
                        datasets: [{
                          label: "Points",
                          backgroundColor: ["#FF5900", "#6C275D", "#FF9A00 ", "#4E4E4E"],
                          borderColor: "transparent",
                          data: slaDetails ? [slaDetails.stat.alert, slaDetails.stat.maintenance, slaDetails.stat.support, slaDetails.stat.task] : <h2 style={{color: "white"}}>No Data</h2>,
                        }]
                      }}
                      options={{
                        responsive: true,
                        legend: {
                          display: true,
                          labels: {
                            fontColor: '#fff',
                            fontSize: 13,
                            usePointStyle: true,
                            padding: 8,
                          },
                          position: "top",
                          align: "start",
                        },
                      }} />
                  </Grid>

                  <Grid item xs={12} md={12} lg={4} className={classes.graphGridSLA}>
                    <h3 className={classes.heading4SLA} onClick={() => history.push("/sla/overviewjiraissues")} >SLA Performance Met v/s Exceeded</h3>
                    {slaDetails ? <Bar
                      data={{
                        labels: slaDetails ? slaDetails.linegraph_labels : null,
                        datasets: [{
                          label: "Met",
                          backgroundColor: "#39A627",
                          data: slaDetails ? slaDetails.bargraph_issuesmet : null,
                        },
                        {
                          label: "Exceeded",
                          backgroundColor: "#FE5900",
                          data: slaDetails ? slaDetails.bargraph_issuesbreached : null,
                        },
                        ]
                      }}
                      options={{
                        responsive: true,
                        legend: {
                          display: true,
                          labels: {
                            fontColor: '#fff',
                            fontSize: 13,
                            usePointStyle: true,
                            padding: 15,

                          },
                          position: "top",
                          align: "start",
                        },
                        scales: {
                          xAxes: [{
                            stacked: true,
                            ticks: {
                              fontColor: "#fff",
                              fontSize: 10,
                            },
                          }],
                          yAxes: [{
                            stacked: true,
                            ticks: {
                              fontColor: "#fff",
                              fontSize: 10,
                            },
                          }]
                        }
                      }
                      } /> : null}
                  </Grid>

                  <Grid item xs={12} md={12} lg={4} className={classes.graphGridSLA}>
                    <h3 className={classes.heading4SLA} onClick={() => history.push("/sla/overview/jiraissues")}>Issues Created v/s Resolved</h3>
                    {slaDetails ? <Line
                      data={{
                        labels: slaDetails ? slaDetails.linegraph_labels : null,
                        datasets: [{
                          label: "created",
                          backgroundColor: "#FE5900",
                          borderColor: "#FE5900",
                          data: slaDetails ? slaDetails.linegraph_createdissues : null,
                          fill: false,
                        },
                        {
                          label: "resolved",
                          borderColor: "#39A627",
                          backgroundColor: "#39A627",
                          data: slaDetails ? slaDetails.linegraph_resolvedissues : null,
                          fill: false,
                        }]
                      }}
                      options={{
                        responsive: true,
                        legend: {
                          display: true,
                          labels: {
                            fontColor: '#fff',
                            fontSize: 13,
                            usePointStyle: true,
                            padding: 15,
                          },
                          position: "top",
                          align: "start",
                        },
                        scales: {
                          xAxes: [{
                            gridLines: {
                              display: false,
                            },
                            ticks: {
                              fontColor: "#fff",
                              fontSize: 10,
                            },
                          }],
                          yAxes: [{
                            display: true,
                            gridLines: {
                              display: true,
                            },
                            ticks: {
                              fontColor: "#fff",
                              fontSize: 10,
                            },
                          }],
                        }
                      }} /> : null}
                  </Grid>
                </Grid>
              </Grid>
            </div> : null}
          </Grid>
          <div>
          </div>
        </main>
      }
      {slaDetails ? <main className={classes.layoutSLA}>
        <div>
          {loadingDetails ? null : <Button className={classes.buttonSLA} style={{ 'color': slaOut === true ? 'white' : '#A4A4A4' }} onClick={toggleOut}>Issues Out of SLA</Button>}
          {loadingDetails ? null : <Button className={classes.buttonSLA} style={{ 'color': slaAlmostOut === true ? 'white' : '#A4A4A4' }} onClick={toggleAlmostOut}>Issues Almost Out of SLA</Button>}
          {loadingDetails ? null : <Button className={classes.buttonSLA} style={{ 'color': 'white' }} onClick={reset}>Reset</Button>}
        </div>

        {loadingDetails ? <Spinner /> :
          slaOut === false ? null : 
          <div>
            <h2 className={classes.headingSLA}>Last Top 10 Issues Out Of SLA</h2>
            <Grid //Gloal grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid //Card Grid
                container
                display="flex"
                alignItems="stretch"
              >
                {slaDetails ? null :
                  <Grid //Gloal grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                  >
                    <h3 className={classes.noData}>No Data</h3>
                  </Grid>}

                {slaDetails ? slaDetails.breached.map((item) => (
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
                            <h4 className={classes.noBold}>{item.resolution === "" || null ? "No Data" : item.resolution}</h4>
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
            
                          </Grid>
                          <Grid item md={4} xs={4}>
                            <h4 style={mystyle}>TIME TO RESOLUTION</h4>
                            <h4 className={classes.noBold}>{item.timeResolution === null ? "No Data" : timeSpent(item.timeResolution, item.datecreated)}</h4>
                          </Grid>
                          <Grid item md={4} xs={6}>
                            <h4 style={mystyle}>SLA STATUS</h4>
                            <h4 className={classes.noBold}>{item.status2 === null ? "No Data" : item.status2}</h4>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                )) : <h2 style={{color: "white"}}>No Data</h2>}
              </Grid>
            </Grid>
          </div>}
        {loadingDetails ? null : <div>
          {slaOut === false ? null : <hr className={classes.lineSLA}></hr>}
        </div>}

        {loadingDetails ? <Spinner /> :
          slaAlmostOut === false ? null : 
          <div>
            <h2 className={classes.headingSLA}>Last Top 10 Issues Almost Out of SLA</h2>
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
                {slaDetails ? null : 
                <Grid //Gloal grid
                  container
                  direction="column" 
                  alignItems="center"
                  justify="center"
                  className={classes.layout2}>
                  <h3 className={classes.noData}>There is no data</h3>
                </Grid>}
                {slaDetails.out ? slaDetails.out.map(item => (
                  <Grid key={item[0].issueKey} item xs={12} xl={6} sm={12} md={12} lg={6} onClick={() => window.open("https://uat-jira-dc.obsidian.co.za/browse/" + item[0].issueKey)}>
                    <Paper className={classes.paperSLA}>
                      <h2>{item[0].issueKey}</h2>
                      <div>
                        <Grid id="top-row" container>
                          <Grid item xs={8}>
                            <h4 style={mystyle}>ISSUE TYPE</h4>
                            <h4 className={classes.noBold}>{item[0].type === null ? "No Data" : item[0].type}</h4>
                          </Grid>
                          <Grid item xs={4}>
                            <h4 style={mystyle}>PRIORITY</h4>
                            <h4 className={classes.noBold}>{item[0].priority === "" || null ? "No Data" : item[0].priority}</h4>
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        <Grid id="top-row" container>
                          <Grid item xs={8}>
                            <h4 style={mystyle}>RESOLUTION</h4>
                            <h4 className={classes.noBold}>{item[0].resolution === "" ? "No Data" : item[0].resolution}</h4>
                          </Grid>
                          <Grid item xs={4}>
                            <h4 style={mystyle}>STATUS</h4>
                            <h4 className={classes.noBold}>{item[0].status2 === null ? "No Data" : item[0].status2}</h4>
                          </Grid>
                        </Grid>
                      </div>
                      <div>
                        <Grid id="top-row" container>
                          <Grid item xs={12}>
                            <h4 style={mystyle}>SUMMARY</h4>
                            <h4 className={classes.noBold}>{item[0].summary === null ? "No Data" : item[0].summary}</h4>
                          </Grid>
                        </Grid>
                      </div>
                      <hr></hr>

                      <div>
                        <Grid id="top-row" container>
                          <Grid item md={4} xs={8}>
                            <h4 style={mystyle}>TOTAL TIME SPENT</h4>
                            <h4 className={classes.noBold}>{item[0].spentTime === null ? "No Data" : msToHMS(item[0].spentTime)}</h4>
                          </Grid>
                          <Grid item md={4} xs={4} >
                            <h4 style={mystyle}>ASSIGNEE</h4>
                            <h4 className={classes.noBold} style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{item[0].theAsignee === null ? "No Data" : item[0].theAsignee}</h4>
                          </Grid>
                          <Grid item md={4} xs={6}>
                            <h4 style={mystyle}>CONTRIBUTOR</h4>
                            <h4 className={classes.noBold}>{item[0].theContributer === null ? "No Data" : item[0].theContributer}</h4>
                          </Grid>
                        </Grid>
                      </div>
                      <hr></hr>
                      <div>
                        <Grid id="top-row" container>
                          <Grid item md={4} xs={8}>
                            <h4 style={mystyle}>TIME TO FIRST RESPONSE</h4>
                            <h4 className={classes.noBold}>{item[0].firstResponse === null ? "No Data" : timeSpent(item[0].firstResponse, item[0].datecreated)}</h4>
                          </Grid>
                          <Grid item md={4} xs={4}>
                            <h4 style={mystyle}>TIME TO RESOLUTION</h4>
                            <h4 className={classes.noBold}>{item[0].timeResolution === null ? "No Data" : timeSpent(item[0].timeResolution, item[0].datecreated)}</h4>
                          </Grid>
                          <Grid item md={4} xs={6}>
                            <h4 style={mystyle}>SLA STATUS</h4>
                            <h4 className={classes.noBold}>{item[0].status2 === null ? "No Data" : item[0].status2}</h4>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                )) : <h2 style={{color: "white"}}>No Data</h2>}
              </Grid>
            </Grid>
          </div>}
      </main> : loadingDetails ? <Spinner /> : <div className={classes.centerDiv}><h2 className={classes.NoDataText}>No Data</h2></div>}
    </div>
  );
};
