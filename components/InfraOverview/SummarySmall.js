import React, { useState } from "react";
import DonutChart from "react-donut-chart";
import { Hexagon } from "components";
import { Button, Paper, Grid, Hidden } from "@material-ui/core";
import Spinner from "components/User/Spinner";
import { useHistory } from "react-router-dom";
import { Auth, API } from 'aws-amplify';
import config from "UserPoolAmplify";
import useStyles from "./useStylesInfraOver";

export default (props) => {
  const [buttonStyle, setButtonStyle] = useState("2px solid #9A2849");
  const total = props.total
  const success = props.success
  const missing = props.missing
  const failed = props.failed
  const [isLoading,] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const classes = useStyles();
  const history = useHistory();

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
          }).finally(() => {
            setButtonStyle("2px solid #9A2849")
            setLoadingCSV(false)
          })

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
          })
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
                onClick={() => downloadCSV()}
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
                onClick={() => downloadPDF()}
              >
                DOWNLOAD PDF
              </Button>
            )}
        </div>
      );
    }
  }

  return (
    <main onClick={() => history.push("/infrastructure/overview/nodes")}>
      {isLoading && <Spinner />}
      <Paper className={classes.paperNode}>
        <Grid
          container
          direction="row"
          justify="center"
          display="flex"
        >

          <Grid item xs={12} sm={6} md={6} lg={7} align="center">
            <h1>Nodes</h1>

            <DonutChart
              className="graph"
              colors={["green", "red", "orange"]}
              legend={false}
              width={300}
              height={300}
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
            />
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
                          id={1}
                        />
                      </td>
                      <td>Successful Nodes</td>
                      <td className={classes.space}>{success}</td>
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
                      <td className={classes.space}>{missing}</td>
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
                      <td className={classes.space}>{failed}</td>
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
    </main >
  );
}
