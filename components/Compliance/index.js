import React, { useState, useEffect } from "react";
import { Button, Paper, Grid, Typography } from "@material-ui/core";
import DonutChart from "react-donut-chart/lib/dist/DonutChart";
import { useHistory } from "react-router-dom";
import { Hexagon } from "components";
import Spinner from "components/User/Spinner";
import { Auth, API } from "aws-amplify";
import config from "UserPoolAmplify";
import useStyles from "./useStylesComp";

export default () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [total, setTotal] = useState(1);
  const [success, setSucess] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [failed, setFailed] = useState(0);
  const [waived, setWaived] = useState(0);
  const [profile, setProfile] = useState();
  const [failures, setFailures] = useState();
  const [profileData] = useState();
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [cisToggle, setCisToggle] = useState(false);
  const [url, setUrl] = useState("/comp/controls?cis=true");

  useEffect(() => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];
        const user = await Auth.currentAuthenticatedUser();

        let jwtToken = user.signInUserSession.idToken.jwtToken;
        const options = {
          response: true,
          headers: {
            Authorization: jwtToken,
          },
        };

        const complainceData = await API.get(ApiData.name, "/comp/controls", options);
        setProfile(complainceData.data.Profiles);
        setTotal(complainceData.data.control_summary_totals.total);
        setFailed(complainceData.data.control_summary_totals.failed.total);
        setSucess(complainceData.data.control_summary_totals.passed.total);
        setWaived(complainceData.data.control_summary_totals.waived.total);
        setSkipped(complainceData.data.control_summary_totals.skipped.total);
        setFailures(complainceData.data.Control_failure);
        
      } catch (err) {
        console.log(err);
      } finally{setLoading(false);}
    })();
  }, []);

  const pad = (n, width, z) => {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };

  let today = new Date();
  let start_time = `${today.getFullYear()}-${pad(
    today.getMonth() + 1,
    2
  )}-${pad(today.getDate(), 2)}T00:00:00Z`;
  let end_time = `${today.getFullYear()}-${pad(today.getMonth() + 1, 2)}-${pad(
    today.getDate(),
    2
  )}T23:59:59Z`;

  const downloadReport = (type) => {
    type === "csv" ? setLoadingCSV(true) : setLoadingPDF(true);
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];
        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: jwtToken,
            },
          };
          API.get(
            ApiData.name,
            `/comp/exports?type=${type}&start_time=${start_time}&end_time=${end_time}`,
            options
          )
            .then((res) => {
              window.open(res.signed_url, "_blank");
            })
            .catch((error) => {
              console.log(error.response);
            })
            .finally(() => {
              setLoadingCSV(false);
              setLoadingPDF(false);
            });
        });
      } catch (err) {
        console.log(err);
      }
    })();
  };

  function sortProfileData(arr) {
    if (arr !== undefined) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] < arr[j]) {
            let swap = arr[i];
            arr[i] = arr[j];
            arr[j] = swap;
          }
        }
      }
      return arr;
    }
  }
  sortProfileData(profileData);

  function checkSuccess() {
    if (success < 1){
      return ("0%");
    } else {
      return ((success / total) * 100).toFixed(1) + "%";
    }
  }

  function checkWaived() {
    if (waived < 1) {
      return ("0%");
    } else {
      return ((waived / total) * 100).toFixed(1) + "%";
    }
  }

  function checkFailed() {
    if (failed < 1) {
      return ("0%");
    } else {
      return ((failed / total) * 100).toFixed(1) + "%";
    }
  }

  function checkSkipped() {
    if (skipped < 1) {
      return ("0%");
    } else {
      return ((skipped / total) * 100).toFixed(1) + "%";
    }
  }

  function cisButton() {
    setLoading(true);
    if (cisToggle === false) {
      setUrl("/comp/controls");
      setCisToggle(!cisToggle);
    } else {
      setUrl("/comp/controls?cis=true");
      setCisToggle(!cisToggle);
    }

    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];
        const user = await Auth.currentAuthenticatedUser();

        let jwtToken = user.signInUserSession.idToken.jwtToken;
        const options = {
          response: true,
          headers: {
            Authorization: jwtToken,
          },
        };

        const complainceData = await API.get(ApiData.name, url, options);
        setProfile(complainceData.data.Profiles);
        setTotal(complainceData.data.control_summary_totals.total);
        setFailed(complainceData.data.control_summary_totals.failed.total);
        setSucess(complainceData.data.control_summary_totals.passed.total);
        setWaived(complainceData.data.control_summary_totals.waived.total);
        setSkipped(complainceData.data.control_summary_totals.skipped.total);
        setFailures(complainceData.data.Control_failure);
      } catch (err) {
        console.log(err);
      } finally{setLoading(false);}
    })();
  }

  function buttonCheck() {
    if (total > 1) {
      return (
        <div className={classes.buttonClass}>
          {loadingCSV ? (
            <div className="lds-dual-ring2"></div>
          ) : (
            <Button
              className={classes.buttonfont}
              style={{
                color: "white",
                backgroundColor: "#9A2849",
                borderRadius: "20px",
                marginRight: "10px"
              }}
              onClick={() => downloadReport("csv")}
            >
              DOWNLOAD CSV
            </Button>
          )}

          {loadingPDF ? (
            <div className="lds-dual-ring2"></div>
          ) : (
            <Button
              className={classes.buttonfont}
              style={{
                color: "white",
                border: "2px solid #9A2849",
                borderRadius: "20px",
                marginRight: "10px"
              }}
              onClick={() => downloadReport("json")}
            >
              DOWNLOAD PDF
            </Button>
          )}
        </div>
      );
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Grid container
            display="flex"
            direction="row"
            alignItems="center"
            justify="center"
            className={classes.compliance}
          >
            <Grid
              item
              xs={12}
              container
              display="flex"
              direction="row"
              alignItems="center"
              justify="center"
              fontSize="16px"
              fontWeight="normal" 
            >
              <div>
                <h2>Compliance</h2>
              </div>
            </Grid>
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className={classes.compButtons}
            >
              <Button
                onClick={cisButton}
                style={{
                  background: "#9A2849",
                  color: "white",
                  borderRadius: "5em",
                  width: "140px",
                  height: "28px",
                  marginTop: "-10px"
                }}
              >
                CIS
              </Button>
            </div>
          </Grid>

          <Grid
            container
            display="flex"
            direction="row"
            justify="center"
            alignItems="center"
            justifyContent="center"
            className={classes.graph}
          >
            <Grid item xs={12} sm={12} md={4} lg={5} container
              display="flex"
              direction="row"
              alignItems="center"
              justify="center"
            >
              {success == 0 ?               
              <DonutChart
                className="graph"
                colors={["green", "red", "orange", "grey"]}
                legend={false}
                width={350}
                height={350}
                data={[
                  {
                    label: "Passed Controls",
                    value: 0.5
                  },
                ]}>
                </DonutChart>
              : 
              <DonutChart
                className="graph"
                colors={["green", "red", "orange", "grey"]}
                legend={false}
                width={350}
                height={350}
                data={[
                  {
                    label: "Passed Controls",
                    value: success,
                  },
                  {
                    label: "Failed Controls",
                    value: failed,
                  },
                  {
                    label: "Waived Controls",
                    value: waived,
                  },
                  {
                    label: "Skipped Controls",
                    value: skipped,
                  },
                ]}
              >
              </DonutChart>}
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={5} className={classes.data} align="center">
              <div className="data">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Hexagon
                          color="green"
                          text={checkSuccess()}
                          id="comp-1"
                        />
                      </td>
                      <td>Passed Controls</td>
                      <td className={classes.space}>{success}</td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr>
                      <td>
                        <Hexagon
                          color="orange"
                          text={checkWaived()}
                          id="comp-2"
                        />
                      </td>
                      <td>Waived Controls</td>
                      <td className={classes.space}>{waived}</td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr>
                      <td>
                        <Hexagon color="red" text={checkFailed()} id="comp-3" />
                      </td>
                      <td>Failed Controls</td>
                      <td className={classes.space}>{failed}</td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr>
                      <td>
                        <Hexagon
                          color="grey"
                          text={checkSkipped()}
                          id="comp-4"
                        />
                      </td>
                      <td>Skipped Controls</td>
                      <td className={classes.space}>{skipped}</td>
                    </tr>
                  </tbody>
                </table>
                <div className={classes.theButtons}>{buttonCheck()}</div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </main>

      <div className={classes.layoutBottom}>
        <Grid container display="flex" direction="row" justifyContent="center">
          <Grid item xs={12} lg={6}>
            <Paper className={classes.paper2Left}>
              <Grid display="flex" container>
                <Grid item xs={6}>
                  <h4 className={classes.heading3}>Top Profile Failures </h4>
                </Grid>

                <Grid item className={classes.typo} xs={6}>
                  <h4 className={classes.heading2}>Total Impacted</h4>
                </Grid>
              </Grid>
              <hr />
              {profile &&
              <Grid container style={{ marginTop: "10px" }}>
              
                {profile.map((node, index) => {
                  return (
                    <Grid item xs={12} lg={12} style={{ marginBottom: "25px" }}>
                      <Grid
                        container
                        jdirection="row"
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item xs={6}>
                          <Typography align="left" style={{color: "#FA336C"}}>
                            {node.profile_name}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography align="right">
                            {node.control_count}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
              }
            </Paper>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Paper className={classes.failedControlsPaper} onClick={() => {history.push(`/infrastructure/overview/compliance/NodeType`);}}>
              <Grid display="flex" container>
                <Grid item xs={4}>
                  <h4 className={classes.heading3}>Top Failed Controls</h4>
                </Grid>

                <Grid item className={classes.typo} xs={4}> 
                  <h4 className={classes.heading2}>
                    Total Impacted
                  </h4>
                </Grid>

                <Grid item className={classes.typo} xs={4}> 
                  <h4 className={classes.heading} style={{ marginRight: "20px" }}>
                    Nodes
                  </h4>
                </Grid>
                {/* </Grid> */}
              </Grid>
              <hr />
              { failures &&
              <Grid container className={classes.paper2}>
                {failures.sort(compare).map((failure) => {
                  return (
                    <Grid item xs={12} lg={12} style={{ marginBottom: "25px"}}>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item xs={4}>
                          <Typography align="left" style={{color: "#FA336C"}}>
                            {failure.name}
                          </Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography align="right">
                            {failure.total}
                          </Typography>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography
                            style={{ marginRight: "10px" }}
                            align="right"
                          >
                            {failure.failure_count}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
              }
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

function compare(a, b) {
  const totalA = a.failure_count;
  const totalB = b.failure_count;

  let comparison = 0;
  if (totalA > totalB) {
    comparison = -1;
  } else if (totalA < totalB) {
    comparison = 1;
  }
  return comparison;
}
