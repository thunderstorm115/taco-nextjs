import React, { useState, useEffect } from 'react';
import { Grid, TextField } from "@material-ui/core";
import useStyles from "./useStylesMonitoring";
import { withStyles } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import WarningIcon from '@material-ui/icons/Warning';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import { Hexagon } from "components";
import { API } from 'aws-amplify';
import config from "UserPoolAmplify";
import { Auth } from 'aws-amplify';
import Spinner from "components/User/Spinner";
import { useHistory } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

export default () => {
  const classes = useStyles();
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const history = useHistory();
  let count1 = 0;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
       
        const ApiData = config.APIDetails.endpoints[0];
        const user = await Auth.currentAuthenticatedUser();

        let jwtToken = user.signInUserSession.idToken.jwtToken;
        const options = {
          response: true,
          headers: {
            Authorization: jwtToken,
          },
        };

        const companyData = await API.get(ApiData.name, '/monitoring/overview/nodes', options);
        setInfo(companyData.data)
      } catch (err) {
        console.log(err);
      } finally{setLoading(false); 
        console.log("info",info)}
    })();

  }, []);

  const chooseNode = (hostName) => {
    setLoading(false);
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
                "custom:node_hostname": hostName,
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
                  history.push({
                    pathname: "/nodedrilldown",
                    node: hostName,
                  })
                setLoading(false);
              });
          }
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }

  function statusFunctionDown(up, total) {
    let upCalc = total - up
    return upCalc;
  }

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  function healthUp(total, active) {
    if (active === 0) {
      return "0";
    }
    else if (active === total) {
      return "100";
    }
    else {
      let percent = ((active / total) * 100).toFixed(2)
      return percent;
    }
    ;
  }

  function healthWarning(total, warning) {
    if (warning === 0) {
      return "0";
    }
    else {
      let percent = ((warning / total) * 100).toFixed(2)
      return percent;
    }
    ;
  }

  function healthCritical(total, critical) {
    if (critical === 0) {
      return "0";
    }
    else {
      let percent = ((critical / total) * 100).toFixed(2)
      return percent;
    }
    ;
  }

  return (
    loading ? <Spinner /> :
      <Grid container>
        <Grid //Global grid
          container
          direction="column"
          className={classes.globalGrid}
        >
            <TextField
              className={classes.textField}
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          <Grid //Card Grid
            container
            display="flex"
            alignItems="stretch"
            className={classes.cardGrid}
          >
            {info < 1 ? <h2 className={classes.headingTop}>No Data</h2> : null}
            {console.log(info)}
            {info
            .filter((item) => 
              item[0].hostName.toLowerCase().includes(
                search.toLowerCase()
              )
            )
            .map(item => (
              <div className={classes.gridContainerDiv} >
                <Grid container className={classes.cardBlock}>
                  <Grid item xs={10} md={9}>
                    <h2 className={classes.headingTop}>{item[0].hostName}</h2>
                  </Grid>

                  <hr className={classes.line}/>

                  <Grid container
                    onClick={() => {
                      chooseNode(item[0].hostName);
                    }}>

                    <Grid container>
                      {/* Status */}
                      <Grid item xs={3} md={3} lg={3} style={{ display: "table" }}>
                        <h4 className={classes.firstGridHeading}>Status</h4>
                        <Grid>
                          <Grid container style={{ display: "inline-flex", marginTop: "30px" }} direction="row" alignItems="center">
                            <Grid item xs={6} md={4} lg={4}>
                              <ArrowUpwardIcon style={{ fill: "#39A628" }} className={classes.largeIcon} />
                            </Grid>
                            <Grid item xs={6} md={8} lg={8} className={classes.iconText}>
                              <p className={classes.iconText}>{item[0].ServicesUp}</p>
                            </Grid>
                          </Grid>

                          <Grid container style={{ display: "inline-flex", marginTop: "0px" }} direction="row" alignItems="center">
                            <Grid item xs={6} md={4} lg={4}>
                              <ArrowDownwardIcon style={{ fill: "#FF5900" }} className={classes.largeIcon} />
                            </Grid>
                            <Grid item xs={6} md={8} lg={8} className={classes.iconText}>
                              <p className={classes.iconText2}>{statusFunctionDown(item[0].ServicesUp, item[0].totalServices)}</p>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Services Monitored */}
                      <Grid item xs={3} md={3} lg={3} style={{ display: "table" }} onClick={() => history.push("/infrastructure/overview/compliance")}>
                        <h4 className={classes.firstGridHeading}>Services Monitored</h4>
                        <Grid container style={{ display: "inline-flex", marginTop: "7.5px" }} direction="row" alignItems="center">
                          <Grid item xs={8} className={classes.icontext}>
                            <p className={classes.iconText}>{item[0].totalServices}</p>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Passed Controls */}
                      <Grid item xs={3} md={3} lg={3} style={{ display: "table" }} onClick={() => history.push("/infrastructure/overview/nodes")}>
                        <h4 className={classes.firstGridHeading}>Passed Controls</h4>
                        <Grid container style={{ display: "inline-flex" }} direction="row" alignItems="center">
                          {item[0].controls === undefined ?
                            <Grid item xs={12} >
                              {/* <h4 className={classes.heading}>Passed Controls</h4> */}
                              <p className={classes.passedControlsText}>Unknown</p>
                            </Grid>
                            :
                            <Grid item xs={12} >
                              {/* <h4 className={classes.heading}>Passed Controls</h4> */}
                              <p className={classes.passedControlsText}>{item[0].controls === 0 || null || undefined ? "0" : ((item[0].controls))}</p>
                              {/* <p className={classes.passedControlsText}>{item[0].controls ===  0 ? "0" : ((item[0].controls[0].passed.total / item[0].controls[0].total) * 100).toFixed(0) + "%"}</p> */}
                            </Grid>}
                        </Grid>
                      </Grid>

                      {/* Successful Nodes */}
                      <Grid item xs={3} md={3} lg={3} style={{ display: "table" }}>
                        <h4 className={classes.firstGridHeading}>Successful Nodes</h4>
                        {item[0].healthStatus === 0 ?
                          <Grid container style={{ display: "inline-flex", marginTop: "7.5px" }} direction="row" alignItems="center">
                            <Grid item xs={4}>
                              <ArrowUpwardIcon style={{ fill: "#39A628" }} className={classes.largeIcon} />
                            </Grid>

                            <Grid item xs={8} className={classes.icontext}>
                              <p className={classes.iconText}>Up</p>
                            </Grid>
                          </Grid>
                          : item[0].healthStatus > 0 ?
                            <Grid container style={{ display: "inline-flex" }} direction="row" alignItems="center">
                              <Grid item xs={4}>
                                <ArrowDownwardIcon style={{ fill: "#FF5900" }} className={classes.largeIcon} />
                              </Grid>

                              <Grid item xs={8} className={classes.icontext}>
                                <p className={classes.iconText2}>Down</p>
                              </Grid>
                            </Grid>
                            :
                            <Grid container style={{ display: "inline-flex" }} direction="row" alignItems="center">
                              <Grid item xs={4}>
                                <ArrowDownwardIcon style={{ fill: "#FF5900" }} className={classes.largeIcon} />
                              </Grid>

                              <Grid item xs={8} className={classes.icontext}>
                                <p className={classes.iconText2}>Unknown</p>
                              </Grid>
                            </Grid>}
                      </Grid>
                    </Grid>

                    <hr className={classes.line} />

                    {/* Monitoring Health */}
                    <Grid container>
                      <Grid item xs={12} style={{ display: "table" }}>
                        <h4 className={classes.monitoringHeading}>Monitoring Health</h4>
                      </Grid>
                    </Grid>

                    <Grid container align="center" className={classes.monitoringHealthGrid}>
                      {/* Up */}
                      <Grid item xs={4}>
                        <Grid container>
                          <Grid item xs={12}>
                            <ThumbUpIcon style={{ fill: "#39A628" }} className={classes.monitoringIcon} />
                          </Grid>
                        </Grid>

                        <Grid container style={{ display: "inline-flex" }} direction="row" align="right">
                          <Grid item xs={8} className={classes.iconText}>
                            <p className={classes.iconUp}>{healthUp(item[0].totalServices, item[0].ServicesUp)}%</p>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Warning */}
                      <Grid item xs={4}>
                        <Grid container>
                          <Grid item xs={12}>
                            <WarningIcon style={{ fill: "#FF9A00" }} className={classes.monitoringIcon} />
                          </Grid>
                        </Grid>

                        <Grid container style={{ display: "inline-flex" }} direction="row" align="right">
                          <Grid item xs={8} className={classes.iconText}>
                            <p className={classes.iconWarning}>{healthWarning(item[0].totalServices, item[0].ServicesWarn)}%</p>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Critical */}
                      <Grid item xs={4}>
                        <Grid container>
                          <Grid item xs={12}>
                            <RemoveCircleRoundedIcon style={{ fill: "#FF5900" }} className={classes.monitoringIcon} />
                          </Grid>
                        </Grid>

                        <Grid container style={{ display: "inline-flex" }} direction="row" align="right">
                          <Grid item xs={8} className={classes.iconText}>
                            <p className={classes.iconCritical}>{healthCritical(item[0].totalServices, item[0].ServicesCrit)}%</p>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <hr className={classes.line} />

                    {/* Usages */}
                    <Grid container>
                      <Grid container
                        alignItems="left"
                        justify="left"
                      >
                        <Grid item xs={3} md={3} lg={3}>
                          <h5 className={classes.usages}>Load Avg</h5>
                        </Grid>

                        <Grid item xs={3} md={3} lg={3}>
                          <h5 className={classes.usages}>{item[0].CPU[0] ? item[0].CPU[0]:"No Data"  }</h5>
                        </Grid>

                        <Grid item xs={3} md={3} lg={3}>
                          <h5 className={classes.usages}>Memory Usage</h5>
                        </Grid>

                        <Grid item xs={3} md={3} lg={3} align="right">
                          <h5 className={classes.usages}>{item[0].Memory[0] ? (item[0].Memory[0]).replace(/['"]+/g, '') + "%" : "No Data"}</h5>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Disk Usages */}
                    <Grid container style={{ marginTop: "30px" }}>
                      <Grid item xs={12} style={{ display: "table", marginTop: "-20px" }} >
                        <h4 className={classes.headingHealthDisk}>Disk Usage</h4>
                      </Grid>

                      <Grid container
                        alignItems="center"
                        justify="center"
                      >
                        {item[0].Disks[0] === undefined || null ?
                          <div className={classes.noDiskData}>No Data</div> :
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit">{item[0].Disks[0].disk_Name} </Typography>
                              </React.Fragment>
                            }>
                            <Grid xs={3} md={3} lg={3}>
                              <Hexagon
                                color={item[0].Disks[0].Usage.replace(/['"]+/g, '') < "90" ? "green" : item[0].Disks[0].Usage.replace(/['"]+/g, '') < "95" ? "Orange" : "red" }
                                text={item[0].Disks[0].Usage.replace(/['"]+/g, '') + "%"}
                                id={count1++}
                              />
                            </Grid>
                          </HtmlTooltip>}

                        {item[0].Disks[1] === undefined ?
                          null :
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit">{item[0].Disks[1].disk_Name} </Typography>
                              </React.Fragment>
                            }>
                            <Grid xs={3} md={3} lg={3}  >
                              <Hexagon
                                color={item[0].Disks[1].Usage.replace(/['"]+/g, '') < "90" ? "green" : item[0].Disks[1].Usage.replace(/['"]+/g, '') < "95" ? "Orange" : "red"}
                                text={item[0].Disks[1].Usage.replace(/['"]+/g, '') + "%"}
                                id={count1++}
                              />
                            </Grid>
                          </HtmlTooltip>}

                        {item[0].Disks[2] === undefined ?
                          null :
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit">{item[0].Disks[2].disk_Name} </Typography>
                              </React.Fragment>
                            }>
                            <Grid xs={3} md={3} lg={3}  >
                              <Hexagon
                                color={item[0].Disks[2].Usage.replace(/['"]+/g, '') < "90" ? "green" : item[0].Disks[2].Usage.replace(/['"]+/g, '') < "95" ? "Orange" : "red"}
                                text={item[0].Disks[2].Usage.replace(/['"]+/g, '') + "%"}
                                id={count1++}
                              />
                            </Grid>
                          </HtmlTooltip>}

                        {item[0].Disks[3] === undefined ?
                          null :
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit">{item[0].Disks[3].disk_Name} </Typography>
                              </React.Fragment>
                            }>
                            <Grid xs={3} md={3} lg={3}  >
                              <Hexagon
                                color={item[0].Disks[3].Usage.replace(/['"]+/g, '') < "90" ? "green" : item[0].Disks[3].Usage.replace(/['"]+/g, '') < "95" ? "Orange" : "red"}
                                text={item[0].Disks[3].Usage.replace(/['"]+/g, '') + "%"}
                                id={count1++}
                              />
                            </Grid>
                          </HtmlTooltip>}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            ))}
          </Grid>
        </Grid >
      </Grid >
  );
};