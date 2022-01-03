import React, { useState, useEffect } from "react";
import DonutChart from "react-donut-chart";
import { Hexagon } from "components";
import { Button, Paper, Grid } from "@material-ui/core";
import Spinner from "components/User/Spinner";
import { Auth, API } from 'aws-amplify';
import config from "UserPoolAmplify";
import useStyles from "./useStylesInfra";

const pad = (n, width, z) => {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export default function Summary({ setInfraTotal }) {
  const [buttonStyle, setButtonStyle] = useState("2px solid #9A2849");
  const [total, setTotal] = useState(1);
  const [success, setSucess] = useState(0);

  const [missing, setMissing] = useState(0);
  const [failed, setFailed] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);

  const classes = useStyles();
  const [, setControls] = useState();

  useEffect(() => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0]

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            response: true,
            headers: {
              Authorization: jwtToken
            }
          }
          API.get(ApiData.name, "/infra/summary", options).then(res => {
            setSucess(res.data.Data.success);
            setFailed(res.data.Data.failure);
            setMissing(res.data.Data.missing);
            setTotal(
              res.data.Data.success +
              res.data.Data.failure +
              res.data.Data.missing
            );
            setInfraTotal(
              res.data.Data.success +
              res.data.failure +
              res.data.missing
            );
            setTimeout(function () {
              setLoading(false)
            }, 500);
          }).catch(error => {

            console.log(error.response)
          })

        });
      } catch (err) {
        console.log(err);
      }
    })();

  }, [setInfraTotal]);

  // "YYYY-MM-DDThh:mm:ssZ"
  let today = new Date();

  //TODO: Warning (Review)
  let start_time = `${today.getFullYear()}-${pad(today.getMonth() + 1, 2)}-${pad(today.getDate(), 2)}T00:00:00Z`;
  let end_time = `${today.getFullYear()}-${pad(today.getMonth() + 1, 2)}-${pad(today.getDate(), 2)}T23:59:59Z`;

  useEffect(() => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0]

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: jwtToken
            }
          }
          API.get(ApiData.name, "/comp/summary", options).then(res => {
            // setTotal(res.control_summary_totals.total);
            // setFailed(res.control_summary_totals.failed.total);
            // setSucess(res.control_summary_totals.passed.total);
            // setWaived(res.control_summary_totals.waived.total);
            // setSkipped(res.control_summary_totals.skipped.total);
            setControls(res.control_items);
          }).catch(error => {
            console.log(error.response)
          }).finally(() => setLoading(false))

        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const downloadCSV = () => {
    setLoadingCSV(true);
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0]

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: jwtToken
            }
          }
          API.get(ApiData.name, "/infra/export?type=csv", options).then(res => {
            window.open(res.signed_url, '_blank');
          }).catch(error => {
            console.log(error.response)
          }).finally(() => setLoadingCSV(false))

        });
      } catch (err) {
        console.log(err);
      }
    })();
  }

  const downloadPDF = () => {
    setButtonStyle("none");
    setLoadingPDF(true);
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0]
        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: jwtToken
            }
          }
          API.get(ApiData.name, "/infra/export?type=json", options).then(res => {
            window.open(res.signed_url, '_blank');
          }).catch(error => {
            console.log(error.response)
          }).finally(() => {
            setLoadingPDF(false)
            setButtonStyle("2px solid #9A2849")
          }
          )
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }

  function checkSuccess() {
    if (success < 1) {
      return ("0%")
    }
    else {

      return (((success / total) * 100).toFixed(1) + "%")
    }

  }

  function checkMissing() {
    if (failed < 1) {
      return ("0%")
    }
    else {

      return (((missing / total) * 100).toFixed(1) + "%")
    }

  }

  function checkFailed() {
    if (failed < 1) {
      return ("0%")
    }
    else {

      return (((failed / total) * 100).toFixed(1) + "%")
    }

  }

  function buttonCheck() {
    if (total > 1) {
      return (
        <div className={classes.buttonClass}>
          {loadingCSV ?
            <div className="lds-dual-ring2"></div>
            :
            <Button
              style={{
                color: "white",
                backgroundColor: "#9A2849",
                borderRadius: "20px",
                marginRight: "10px",

                '&:hover': {
                  background: "#202020",
                  color: "white"
               },
              }}
              onClick={() => downloadCSV()}
            >
              DOWNLOAD CSV
            </Button>
          }

          <div className={classes.buttonClass}>
            <Button
              style={{
                color: "white",
                border: buttonStyle,
                borderRadius: "20px",
                '&:hover': {
                  background: "#202020",
                  color: "white"
               },
              }}
              onClick={() => downloadPDF()}
            > {loadingPDF ?
              <div className="lds-dual-ring2"></div>
              : <div>DOWNLOAD PDF</div>
              }
            </Button>
          </div>
        </div>
      )
    }
  }

  return (
    <main className={classes.layoutSumm}>
      {isLoading && <Spinner />}
      <Paper className={classes.paperSumm}>
        <Grid
          container
          direction="column"
          className={classes.infrastructure}
        >
          <Grid
            container
            display="flex"
            direction="row"
            justify="center"
            alignItems="center"
            justifycontent="center"
            className={classes.graph}
          >
            <Grid item xs={12} sm={12} md={6} lg={6} align="center">
              <h1>Nodes</h1>
              <DonutChart
                className="graph"
                colors={["green", "red", "orange"]}
                legend={false}
                width={320}
                height={320}
                data={[
                  {
                    label: "Successful Nodes",
                    value: success,
                  },
                  {
                    label: "Failed Nodes",
                    value: failed,
                  },
                  {
                    label: "Missing Nodes",
                    value: missing,
                  },
                ]}
              ></DonutChart>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              lg={6}
              md={6}
              className={classes.data}
              align="left"
            >
              <div className={classes.data2}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Hexagon
                          color="green"
                          text={checkSuccess()}
                          id={1}
                        />
                      </td>
                      <td>Successful Nodes</td>
                      <td className={classes.spaceSumm}>{success}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td>
                        <Hexagon
                          color="orange"
                          text={checkMissing()}
                          id={2}
                        />
                      </td>
                      <td>Missing Nodes</td>
                      <td className={classes.spaceSumm}>{missing}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td>
                        <Hexagon
                          color="red"
                          text={checkFailed()}
                          id={3}
                        />
                      </td>
                      <td>Failed Nodes</td>
                      <td className={classes.spaceSumm}>{failed}</td>
                    </tr>
                  </tbody>
                </table>
                <div className={classes.theButtons} >
                  {buttonCheck()}
                </div>
              </div>


            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
}
