import React, { useContext, useState, useEffect } from "react";
import { AccountContext } from "./Accounts";
import { useHistory } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import Spinner from "components/User/Spinner";
import { Auth, API } from "aws-amplify";
import config from "UserPoolAmplify";
import useStyles from "./useStylesLogin";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import WarningIcon from "@material-ui/icons/Warning";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";

export default () => {
  const history = useHistory();
  const { logout } = useContext(AccountContext);
  const classes = useStyles();

  const [, setLoading] = useState(true);
  const [, setUserRoles] = useState("");
  const [, setUserCompany] = useState("");
  const [, setUserEmail] = useState("");

  const [userCompanyKey, setUserCompanyKey] = useState("");
  const globalAdminRights = "GlobalAdmin";
  const [userCompanies] = useState([]);
  const [companyMonitor, setCompanyMonitor] = useState([]);
  const [userAdminRights, setUserAdminRights] = useState("");
  const [finishLoad, setFinishLoad] = useState(false);

  const getCompanyData = async(options) => {
      try {
        const ApiData = config.APIDetails.endpoints[0];
        const monitor = await API.get(
          ApiData.name,
          "/monitoring/overview/servers",
          options
        );

        if(monitor.data !== undefined){
          setCompanyMonitor(monitor.data);
        }
        else{
          setCompanyMonitor(monitor);
        }
      } catch (err) {
        console.log(err);
      }
  }

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
        const authUser = await Auth.currentUserPoolUser();
        setUserCompany(authUser.attributes["custom:company_name"]);
        setUserAdminRights(authUser.attributes["profile"]);
        setUserRoles(authUser.attributes["custom:roles"]);
        setUserCompanyKey(authUser.attributes["custom:organization_name"]);
        setUserEmail(authUser.attributes["email"]);

        await getCompanyData(options);
        
      } catch (err) {
        console.log(err);
      }
      finally{setFinishLoad(true);}
    })();
  }, []);

  useEffect(() => {
    if (!userCompanies) {
      setLoading(false);
    }
    else if (userCompanies.length > 0) {
      setLoading(false);
    }
  }, [userCompanies]);

  setTimeout(function () {
    logout();
  }, 3600000);

  const chooseCompany = (companyName, companyID, option) => {
    setFinishLoad(false);
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        cognitoUser.refreshSession(
          currentSession.refreshToken,
          (err, session) => {
            const { idToken } = session;
            let jwtToken = idToken.jwtToken;

            const options = {
              body: {
                "custom:company_name": companyName,
                "custom:organization_name": companyID,
               
              },
              headers: {
                Authorization: jwtToken,
              },
            };
            API.put(ApiData.name, `/users/cognito-update`, options)
              .then((res) => {})
              .catch((error) => {
                console.log(error.response);
              })
              .finally(() => {
                if (option === "selectCompany") {
                  history.push({
                    pathname: "/infrastructure/overview",
                    state: { detail: companyName },
                  });
                } else {
                  history.push({
                    pathname: "/editcompany",
                    state: { detail: companyID, companyname: companyName },
                  });
                }
                setFinishLoad(false);
              });
          }
        );
      } catch (err) {
        console.log(err);
      }
    })();
  };
  
  function hostsdown(up, total) {
    let down = total - up;
    return down;
  }

  function healthUp(total, active) {
    if (active === 0) {
      return "0";
    } else if (active === total) {
      return "100";
    } else {
      let percent = ((active / total) * 100).toFixed(2);
      return percent;
    }
  }

  function healthWarning(total, warning, unknown) {
    if (warning + unknown === 0) {
      return "0";
    } else {
      let percent = (((warning + unknown) / total) * 100).toFixed(2);
      return percent;
    }
  }

  function healthCritical(total, critical) {
    if (critical === 0) {
      return "0";
    } else {
      let percent = ((critical / total) * 100).toFixed(2);
      return percent;
    }
  }

  console.log(companyMonitor)

  return (
    <main>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.button2Status}
      >
        <div className={classes.layoutStatus}>
          {finishLoad === false ? (
            <Spinner />
          ) : (
          <div>  
          <Grid item xs={12} className={classes.btnGrid}>
            <Button
              className={classes.addCompanyButton}
              onClick={() => {
                history.push("/addcompany");
              }}
              style={{ 
                color: "White",
                fontSize: "12px",
              }}
            >
              ADD COMPANY
            </Button>
          </Grid>
          
              <Grid className={classes.gridContainer}>
                {userCompanyKey === "none" ? (
                  <Grid className={classes.Node}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} className={classes.gridSpacing}>
                        <h2 className={classes.heading2Status}>
                          No company is assigned
                        </h2>
                      </Grid>
                    </Grid>
                  </Grid>

                ) : finishLoad === true ? (
                  userAdminRights === globalAdminRights ? (
                    companyMonitor.map((res) => (
                      <Grid key={res.id} className={classes.NodeBox}>
                        <Grid item xs={12}
                          container
                          display="flex"
                          direction="row"
                          style={{marginBottom: "10px", marginTop: "10px"}}
                        >
                          <Grid
                            item
                            xs={9}
                            onClick={() => {
                              chooseCompany(
                                res.companyName,
                                res.companyID,
                                "selectCompany"
                              );
                            }}
                          >
                            <h2
                              className={classes.heading2Status}
                              onClick={() => {
                                chooseCompany(
                                  res.companyName,
                                  res.companyID,
                                  "selectCompany"
                                );
                              }}
                            >
                              {res.companyName}
                            </h2>
                          </Grid>

                          <Grid>
                            <Grid item xs={3}>
                                <Button
                                  className={classes.editButton}
                                  variant="contained"
                                  onClick={() => {
                                    chooseCompany(
                                      res.companyName,
                                      res.companyID,
                                      "editCompany"
                                    ) && setFinishLoad(false);
                                  }}
                                >
                                  EDIT
                                </Button>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          onClick={() => {
                            chooseCompany(
                              res.companyName,
                              res.companyID,
                              "selectCompany"
                            );
                          }}
                        >
                          <hr className={classes.line} />
                          <Grid className={classes.Node}>
                            <Grid container className={classes.nodeSpacingTop}>
                              <Grid container>
                                <Grid item xs={6} lg={5}>
                                  <h4
                                    className={classes.heading}
                                    style={{textAlign: "left"}}
                                  >
                                    Status
                                  </h4>
                                </Grid>

                                <Grid item xs={6} lg={7}>
                                  <h4
                                    className={classes.heading}
                                  >
                                    Services Monitored
                                  </h4>
                                </Grid>
                              </Grid>

                              <Grid container>
                                <Grid
                                  item
                                  xs={6}
                                  style={{ display: "table" }}
                                  className={classes.upMargin}
                                >
                                  <Grid
                                    container
                                    style={{ display: "inline-flex", marginTop: "5px" }}
                                    direction="row"
                                    alignItems="center"
                                  >
                                    <Grid item xs={4}>
                                      <ArrowUpwardIcon
                                        style={{ fill: "#39A628" }}
                                        className={classes.largeIcon}
                                      />
                                    </Grid>
                                    
                                    <Grid
                                      item
                                      xs={8}
                                      className={classes.icontext}
                                    >
                                      <p className={classes.iconText}>
                                        {res.hostActive === null
                                          ? "0"
                                          : res.hostActive}
                                      </p>
                                    </Grid>
                                  </Grid>
                                  <Grid
                                    container
                                    style={{
                                      display: "inline-flex",
                                      marginTop: "-5px",
                                    }}
                                    direction="row"
                                    alignItems="center"
                                    className={classes.noSpacing}
                                  >
                                    <Grid item xs={4}>
                                      <ArrowDownwardIcon
                                        style={{ fill: "#FF5900" }}
                                        className={classes.largeIcon}
                                      />
                                    </Grid>
                                    <Grid
                                      item
                                      xs={8}
                                      className={classes.icontext}
                                    >
                                      <p className={classes.iconText2}>
                                        {hostsdown(
                                          res.hostActive,
                                          res.totalHosts
                                        )}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid
                                  item
                                  xs={6}
                                  style={{ display: "table" }}
                                  align="right"
                                  className={classes.upMargin}
                                >
                                  <Grid
                                    container
                                    style={{ display: "inline-flex", marginTop: "5px" }}
                                    direction="row"
                                    alignItems="center"
                                  >
                                    <Grid item xs={6}>
                                      <p className={classes.textGreen}>
                                        {res.total_Active}
                                      </p>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <p className={classes.textOrange}>
                                        {hostsdown(
                                          res.total_Active,
                                          res.total_Services
                                        )}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <hr className={classes.line} />
                              <Grid
                                container
                                spacing={3}
                                className={classes.nodeSpacing}
                              >
                                <Grid container>
                                  <Grid
                                    item xs={6} lg={7}
                                  >
                                    <h3 className={classes.usagesHeading}>
                                      Passed Controls
                                    </h3>
                                  </Grid>

                                  <Grid
                                    item xs={6} lg={5}
                                  >
                                    <h3
                                      align="right"
                                      className={classes.usagesPercent}
                                    >
                                      {res.Passed_Controls === null
                                        ? "No Data"
                                        : res.Passed_Controls + "%"}
                                    </h3>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                spacing={3}
                                className={classes.nodeSpacing}
                              >
                                <Grid container>
                                  <Grid item xs={6} lg={7}>
                                    <h3 className={classes.usagesHeading}>
                                      Successful Nodes
                                    </h3>
                                  </Grid>

                                  <Grid item xs={6} lg={5}>
                                    <h3
                                      align="right"
                                      className={classes.usagesPercent}
                                    >
                                      {res.successful_nodes === null
                                        ? "No Data"
                                        : res.successful_nodes + "%"}
                                    </h3>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <hr className={classes.line} />
                              <Grid align="left">
                                <h3 className={classes.usages}>
                                  Monitoring Health
                                </h3>
                              </Grid>
                              <Grid
                                container
                                className={classes.gridCenter}
                                align="center"
                                justify="center"
                                alignItems="center"
                              >
                                <Grid
                                  item
                                  xs={4}
                                  align="center"
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid
                                    container
                                    align="center"
                                    justify="center"
                                    alignItems="center"
                                  >
                                    <Grid
                                      item
                                      xs={12}
                                      align="center"
                                      justify="center"
                                      alignItems="center"
                                    >
                                      <ThumbUpIcon
                                        style={{ fill: "#39A628" }}
                                        className={classes.largeIcon}
                                      />
                                    </Grid>
                                  </Grid>

                                  <Grid
                                    container
                                    style={{ display: "inline-flex" }}
                                    direction="row"
                                    alignItems="center"
                                  >
                                    <Grid
                                      item
                                      xs={8}
                                      className={classes.icontext}
                                      align="center"
                                      justify="center"
                                      alignItems="center"
                                    >
                                      <p className={classes.iconUp}>
                                        {res.total_Services === null ||
                                        res.total_Active === null
                                          ? "0%"
                                          : healthUp(
                                              res.total_Services,
                                              res.total_Active
                                            ) + "%"}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid
                                  item
                                  xs={4}
                                  align="center"
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid
                                    container
                                    align="center"
                                    justify="center"
                                    alignItems="center"
                                  >
                                    <Grid
                                      item
                                      xs={12}
                                      align="center"
                                      justify="center"
                                      alignItems="center"
                                    >
                                      <WarningIcon
                                        style={{ fill: "#FF9A00" }}
                                        className={classes.largeIcon}
                                      />
                                    </Grid>
                                  </Grid>

                                  <Grid
                                    container
                                    align="center"
                                    justify="center"
                                    alignItems="center"
                                  >
                                    <Grid
                                      item
                                      xs={8}
                                      className={classes.icontext}
                                      align="center"
                                      justify="center"
                                      alignItems="center"
                                    >
                                      <p className={classes.iconWarning}>
                                        {res.total_Services === null ||
                                        res.total_Unkown === null
                                          ? "0%"
                                          : healthWarning(
                                              res.total_Services,
                                              res.total_Warning,
                                              res.total_Unkown
                                            ) + "%"}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid
                                  item
                                  xs={4}
                                  align="center"
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid
                                    container
                                    align="center"
                                    justify="center"
                                    alignItems="center"
                                  >
                                    <Grid
                                      item
                                      xs={12}
                                      align="center"
                                      justify="center"
                                      alignItems="center"
                                    >
                                      <RemoveCircleRoundedIcon
                                        style={{ fill: "#FF5900" }}
                                        className={classes.largeIcon}
                                      />
                                    </Grid>
                                  </Grid>

                                  <Grid
                                    container
                                    align="center"
                                    justify="center"
                                    alignItems="center"
                                  >
                                    <Grid
                                      item
                                      xs={8}
                                      className={classes.icontext}
                                      align="center"
                                      justify="center"
                                      alignItems="center"
                                    >
                                      <p className={classes.iconCritical}>
                                        {res.total_Services === null ||
                                        res.total_Critical === null
                                          ? "0%"
                                          : healthCritical(
                                              res.total_Services,
                                              res.total_Critical
                                            ) + "%"}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))
                  ) : (
                    history.push("/infrastructure/overview")
                  )
                ) : null}
              </Grid>
            </div>
          )}
        </div>
      </Grid>
    </main>
  );
};
