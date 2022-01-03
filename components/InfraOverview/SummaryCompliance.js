/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from "react";
import { Button, Paper, Grid } from "@material-ui/core";
import DonutChart from "react-donut-chart/lib/dist/DonutChart";
import { Hexagon } from "components";
import Spinner from "components/User/Spinner";
import { Auth, API } from "aws-amplify";
import config from "UserPoolAmplify";
import useStyles from "./useStylesInfraOver";
import { useHistory } from "react-router-dom";

export default (props) => {
  const [loading] = useState(false);
  const classes = useStyles();
  const total = props.total;
  const success = props.success;
  const skipped = props.skipped;
  const failed = props.failed;
  const waived = props.waived;

  const [profileData] = useState();
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const history = useHistory();

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
    if (success < 1) {
      return "0%";
    } else {
      return ((success / total) * 100).toFixed(1) + "%";
    }
  }

  function checkWaived() {
    if (waived < 1) {
      return "0%";
    } else {
      return ((waived / total) * 100).toFixed(1) + "%";
    }
  }

  function checkFailed() {
    if (failed < 1) {
      return "0%";
    } else {
      return ((failed / total) * 100).toFixed(1) + "%";
    }
  }

  function checkSkipped() {
    if (skipped < 1) {
      return "0%";
    } else {
      return ((skipped / total) * 100).toFixed(1) + "%";
    }
  }

  function buttonCheck() {
    if (total !== 0) {
      return (
        <div
          className={classes.buttonClass}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {loadingCSV ? (
            <div className="lds-dual-ring2"></div>
          ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                style={{
                  color: "white",
                  backgroundColor: "#9A2849",
                  borderRadius: "20px",
                  marginRight: "10px",
                  fontSize: "12px",
                  '&:hover': {
                    background: "#202020",
                    color: "white"
                  },
                }}
                //TODO: Warning (Fix functions)
                onClick={() => downloadReport("csv")}
              >
                DOWNLOAD CSV
              </Button>
            )}

          {loadingPDF ? (
            <div className="lds-dual-ring2"></div>
          ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                style={{
                  color: "white",
                  border: "2px solid #9A2849",
                  borderRadius: "20px",
                  fontSize: "12px",
                  '&:hover': {
                    background: "#202020",
                    color: "white"
                  },
                }}
                //TODO: Warning (Fix functions)
                onClick={() => downloadReport("json")}
              >
                DOWNLOAD PDF
              </Button>
            )}
        </div>
      );
    }
  }

  return (
    <main onClick={() => history.push("/infrastructure/overview/compliance")}>
      {loading ? <Spinner /> : null}
      <Paper className={classes.paperCompliance}>
        <Grid
          container
          direction="row"
          justify="center"
          display="flex"
        >
          <Grid item xs={12} sm={6} md={6} lg={7} align="center">
            <h1>Compliance</h1>
            <DonutChart
              className="graph"
              colors={["green", "red", "orange", "grey"]}
              legend={false}
              width={300}
              height={300}
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
            ></DonutChart>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={5} align="center">
            <div>
              <div>
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
                        <Hexagon
                          color="red"
                          text={checkFailed()}
                          id="comp-3"
                        />
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
              </div>


            </div>
          </Grid>

        </Grid>
        <div
          className={classes.theButtons}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {buttonCheck()}
        </div>
      </Paper>
    </main>
  );
};
