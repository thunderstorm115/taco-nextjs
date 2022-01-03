import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./useStylesMonitoringServices";
import { withStyles } from "@material-ui/core/styles";
import Spinner from "components/User/Spinner";
import { API } from "aws-amplify";
import config from "UserPoolAmplify";
import { Auth } from "aws-amplify";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";

import {
  Grid,
  Button,
  TableCell,
  Checkbox,
  Drawer,
  List,
  ListItem,
  TextField,
  Radio,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Styles from "components/MonitoringServices/Styles.css";

export default () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [sec1, setSec1] = useState(true);
  const [sec2, setSec2] = useState(false);
  const [platform, setPlatform] = useState("");
  const [open, setOpen] = React.useState(false);
  const [host, setHost] = useState();
  const [array, setArray] = useState([]);
  const [deleteSet, setDeleteSet] = useState([]);
  const [database, setDatabase] = useState([]);
  const [next] = useState({ id: '"0"' });
  const [nodes, setNodes] = useState();
  const [services, setServices] = useState([]);
  const [, setServiceData] = useState([]);
  const [selectedNode, setSelectedNode] = useState();
  const [databaseDictState, setDatabaseDictState] = useState();
  const [showSubmitMsg, setShowSubmitMsg] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            response: true,
            headers: {
              Authorization: jwtToken,
            },
            body: next,
          };
          API.get(ApiData.name, "/node-management/get-nodes?type=editService", options)
            .then((res) => {
              setNodes(res.data);
            })
            .catch((error) => {
              console.log(error.response);
            })
            .finally(() => setLoading(false));
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  let databaseDict = {};
  const [state, setState] = React.useState({
    right: false,
  });
  const history = useHistory();

  function buttonClickSec1() {
    setSec1(false);
    setSec2(true);
  }

  function backSec1() {
    setSec2(false);
    setSec1(true);
  }

  const toggleDrawer = (anchor, open, type, service_data) => (event) => {
    setPlatform(type);
    setServiceData(service_data);
    setShowSubmitMsg("");

    switch (type) {
      case "LOGCHECK":
        setDatabaseDictState({
          service: "LOGCHECK",
          logfilename: service_data.logfilename,
          keyphrase: service_data.keyphrase,
        });
        break;
      case "ZIMBRA":
        setDatabaseDictState({
          service: "ZIMBRA",
          license: service_data.license,
          services: service_data.services,
        });
        break;
      case "MAILQUEUE":
        setDatabaseDictState({
          service: "MAILQUEUE",
          zimbra: service_data.zimbra,
          postfix: service_data.postfix,
        });
        break;
      case "DATABASE":
        setDatabaseDictState({
          service: "DATABASE",
          databaseType: service_data.databaseType,
          portnumber: service_data.portnumber,
          databasestring: service_data.databasestring,
          username: "",
          password: "",
        });
        break;
      case "DATABASEREPLICATIONSTATUS":
        setDatabaseDictState({
          service: "DATABASE",
          databaseType: service_data.databaseType,
          portnumber: service_data.portnumber,
          databasestring: service_data.databasestring,
          username: "",
          password: "",
        });
        break;
    }
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDatabaseDictState(service_data);
    setState({ ...state, [anchor]: open });
  };

  const handleClose = () => {
    setOpen(false);
  };

  function submit() {
    databaseDict = databaseDictState;
    let theObj = Object.assign({}, selectedNode, databaseDict);
    let theArray = [theObj];
    setArray([...array, theObj]);
    setLoadingUpdate(true);
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            response: true,
            headers: {
              Authorization: jwtToken,
            },
            body: {
              nodes: theArray,
              action: "update",
            },
          };

          API.post(ApiData.name, `/service-config/update-service`, options)
            .then((res) => {})
            .catch((error) => {
              setLoading(false);
              console.log(error.response);
            })
            .finally(() => {
              setShowSubmitMsg(
                "Your service update is in progress. You will be notified via email when your configurations are complete."
              );
              setLoadingUpdate(false);
            });
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }

  function submitDelete() {
    if (deleteSet.length) {
      setLoading(true);
      handleClose();
      (async () => {
        try {
          const ApiData = config.APIDetails.endpoints[0];
          Auth.currentAuthenticatedUser().then((user) => {
            let jwtToken = user.signInUserSession.idToken.jwtToken;
            const options = {
              response: true,
              headers: {
                Authorization: jwtToken,
              },
              body: {
                nodes: deleteSet,
                action: "delete",
              },
            };
            API.post(ApiData.name, `/service-config/update-service`, options)
              .then((res) => {})
              .catch((error) => {
                setLoading(false);
                console.log(error.response);
              })
              .then(() => {
                setLoading(false);
                history.push({
                  pathname: "/finishedServiceDelete",
                });
              });
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }
  const testSubmit = (type) => {
    let theObj = Object.assign({}, host, databaseDict);
    setArray([...array, theObj]);
    submit();
  };

  const handleDatabaseChange = (event) => {
    setDatabaseDictState({
      ...databaseDictState,
      service: "DATABASE",
      databaseType: event.target.value,
    });
  };

  const handleDatabaseReplicationChange = (event) => {
    setDatabaseDictState({
      ...databaseDictState,
      service: "DATABASEREPLICATIONSTATUS",
      databaseType: event.target.value,
    });
  };

  let hostDetail = {};
  const handleChangeCheck = (nodename, fqdn, ipaddress, platform, event) => {
    setSelectedNode({
      NodeQualifiedFullHostname: nodename,
      fqdn: fqdn,
      ip: ipaddress,
      platform: platform,
    });
    setLoading(true);
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            response: true,
            headers: {
              Authorization: jwtToken,
            },
            body: next,
          };
          API.get(
            ApiData.name,
            `/service-config/get-services?node_name=${nodename}`,
            options
          )
            .then((res) => {
              setServices(res.data);
            })
            .catch((error) => {
              console.log(error.response);
            })
            .finally(() => setLoading(false));
        });
      } catch (err) {
        console.log(err);
      }
    })();

    hostDetail["NodeQualifiedFullHostname"] = nodename;
    hostDetail["fqdn"] = fqdn;
    hostDetail["ip"] = ipaddress;
    hostDetail["platform"] = platform;

    setHost(hostDetail);
    buttonClickSec1();
  };

  let hostDelete = {};
  const handleChangeDelete = (
    nodename,
    thefqdn,
    ipaddress,
    platform,
    theservice,
    event
  ) => {
    if (event.target.checked === true) {
      hostDelete = {
        NodeQualifiedFullHostname: nodename,
        fqdn: thefqdn,
        ip: ipaddress,
        platform: platform,
        service: theservice,
      };
      let theObj = Object.assign({}, host, hostDelete);
      setDeleteSet([...deleteSet, theObj]);
    } else {
      deleteSet.map((service, index) => {
        if (service.service === theservice) {
          let deleteSetAfter = deleteSet;
          deleteSetAfter.splice(index, 1);
          setDeleteSet(deleteSetAfter);
        }
      });
    }
  };

  const list = (anchor) => {
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
      >
        <List>
          {/* Port */}
          {platform === "PORT" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>Port</h2>
              <form onSubmit={() => testSubmit()}>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.portnumber}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Port Number"
                    onChange={(event) =>
                      setDatabaseDictState({
                        service: "PORT",
                        portnumber: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "PORT")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>Submit</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}

          {platform === "HTTP" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>HTTP</h2>
              <form onSubmit={() => testSubmit()}>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.httpdomain}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Domain Name"
                    onChange={(event) =>
                      setDatabaseDictState({
                        service: "HTTP",
                        httpdomain: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "HTTP")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>Submit</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {platform === "SSLCERT" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>SSL Cert</h2>
              <form onSubmit={() => testSubmit()}>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.ssldomain}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Domain Name"
                    onChange={(event) =>
                      setDatabaseDictState({
                        service: "SSLCERT",
                        ssldomain: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "SSLCERT")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>Submit</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {platform === "CIFS" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>CIFS Mount</h2>
              <form onSubmit={() => testSubmit()}>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.path}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Mount point/ops/var"
                    onChange={(event) =>
                      setDatabaseDictState({
                        service: "CIFS",
                        path: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "CIFS")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>Submit</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {platform === "NFS" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>NFS Mount</h2>
              <form onSubmit={() => testSubmit()}>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.path}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Mount point/ops/var"
                    onChange={(event) =>
                      setDatabaseDictState({
                        service: "NFS",
                        path: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "NFS")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>Submit</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {platform === "NTP" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>NTP</h2>
              <form onSubmit={() => testSubmit()}>
                <ListItem style={{ padding: "0px" }}>
                  <Checkbox
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    checked={databaseDictState.ntpstatus}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.drawerCheckBox}
                    onChange={(event) =>
                      setDatabaseDictState({
                        service: "NTP",
                        ntpstatus: event.target.checked,
                      })
                    }
                  />
                  <h3>Switch on</h3>
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "NTP")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>Submit</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {platform === "DATABASE" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>Database</h2>
              <form onSubmit={() => testSubmit()}>
                <Grid container>
                  <Grid items xs={12}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        className={classes.drawerCheckBox}
                        aria-label="database"
                        name="database"
                        onChange={handleDatabaseChange}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        <FormControlLabel
                          style={{ padding: "0px" }}
                          checked={
                            databaseDictState.databaseType === "mysql"
                              ? true
                              : false
                          }
                          value="mysql"
                          control={<Radio className={classes.drawerCheckBox} />}
                          label="MySQL"
                        />
                        <FormControlLabel
                          style={{ padding: "0px" }}
                          checked={
                            databaseDictState.databaseType === "oracle"
                              ? true
                              : false
                          }
                          value="oracle"
                          control={<Radio className={classes.drawerCheckBox} />}
                          label="Oracle"
                        />
                        <FormControlLabel
                          style={{ padding: "0px" }}
                          checked={
                            databaseDictState.databaseType === "postgresql"
                              ? true
                              : false
                          }
                          value="postgresql"
                          control={<Radio className={classes.drawerCheckBox} />}
                          label="PostgreSQL"
                        />
                        <FormControlLabel
                          style={{ padding: "0px" }}
                          checked={
                            databaseDictState.databaseType === "sqlserver"
                              ? true
                              : false
                          }
                          value="sqlserver"
                          control={<Radio className={classes.drawerCheckBox} />}
                          label="My SQL Server"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <h3>Other</h3>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    fullWidth
                    value={
                      databaseDictState.databaseType !== "mysql" &&
                      databaseDictState.databaseType !== "oracle" &&
                      databaseDictState.databaseType !== "postgresql" &&
                      databaseDictState.databaseType !== "sqlserver"
                        ? databaseDictState.databaseType
                        : ""
                    }
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Database"
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "DATABASE",
                        databaseType: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>Details</h3>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.portnumber}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Port"
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "DATABASE",
                        portnumber: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Connection String"
                    value={databaseDictState.databasestring}
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "DATABASE",
                        databasestring: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.username}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Username"
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "DATABASE",
                        username: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.password}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Password"
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "DATABASE",
                        password: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "DATABASE")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>Submit</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {platform === "DATABASEREPLICATIONSTATUS" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>Database Replication Status</h2>
              <form onSubmit={() => testSubmit()}>
                <Grid container>
                  <Grid items xs={12}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        className={classes.drawerCheckBox}
                        aria-label="database"
                        name="database"
                        onChange={handleDatabaseReplicationChange}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        <FormControlLabel
                          style={{ padding: "0px" }}
                          checked={
                            databaseDictState.databaseType === "mysql"
                              ? true
                              : false
                          }
                          value="mysql"
                          control={<Radio className={classes.drawerCheckBox} />}
                          label="MySQL"
                        />
                        <FormControlLabel
                          style={{ padding: "0px" }}
                          checked={
                            databaseDictState.databaseType === "oracle"
                              ? true
                              : false
                          }
                          value="oracle"
                          control={<Radio className={classes.drawerCheckBox} />}
                          label="Oracle"
                        />
                        <FormControlLabel
                          style={{ padding: "0px" }}
                          checked={
                            databaseDictState.databaseType === "postgresql"
                              ? true
                              : false
                          }
                          value="postgresql"
                          control={<Radio className={classes.drawerCheckBox} />}
                          label="PostgreSQL"
                        />
                        <FormControlLabel
                          style={{ padding: "0px" }}
                          checked={
                            databaseDictState.databaseType === "sqlserver"
                              ? true
                              : false
                          }
                          value="sqlserver"
                          control={<Radio className={classes.drawerCheckBox} />}
                          label="My SQL Server"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <h3>Other</h3>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={
                      databaseDictState.databaseType !== "mysql" &&
                      databaseDictState.databaseType !== "oracle" &&
                      databaseDictState.databaseType !== "postgresql" &&
                      databaseDictState.databaseType !== "sqlserver"
                        ? databaseDictState.databaseType
                        : ""
                    }
                    fullWidth
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Database"
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "DATABASEREPLICATIONSTATUS",
                        databaseType: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>Details</h3>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.portnumber}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Port"
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "DATABASEREPLICATIONSTATUS",
                        portnumber: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Connection String"
                    value={databaseDictState.databasestring}
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "DATABASEREPLICATIONSTATUS",
                        databasestring: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Username"
                    value={databaseDictState.username}
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "DATABASEREPLICATIONSTATUS",
                        username: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Password"
                    value={databaseDictState.password}
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "DATABASEREPLICATIONSTATUS",
                        password: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={
                    (databaseDict["service"] = "DATABASEREPLICATIONSTATUS")
                  }
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {platform === "APPLICATIONPROCESS" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>Application Process</h2>
              <form onSubmit={() => testSubmit()}>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.applicationname}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Application Name"
                    onChange={(event) =>
                      setDatabaseDictState({
                        service: "APPLICATIONPROCESS",
                        applicationname: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "APPLICATIONPROCESS")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {platform === "NETWORKINTERFACE" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>Network Interface Name</h2>
              <form onSubmit={() => testSubmit()}>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.networkinterfacename}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Network Interface Name"
                    onChange={(event) =>
                      setDatabaseDictState({
                        service: "NETWORKINTERFACE",
                        networkinterfacename: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "NETWORKINTERFACE")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {platform === "PROXY" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>Proxy</h2>
              <form onSubmit={() => testSubmit()}>
                <ListItem style={{ padding: "0px" }}>
                  <Checkbox
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    checked={databaseDictState.proxystatus}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.drawerCheckBox}
                    onChange={(event) =>
                      setDatabaseDictState({
                        service: "PROXY",
                        proxystatus: event.target.checked,
                      })
                    }
                  />
                  <h3>Switch on</h3>
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "PROXY")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {platform === "LOGCHECK" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>Log Check</h2>
              <form onSubmit={() => testSubmit()}>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.logfilename}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Log File Name"
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "LOGCHECK",
                        logfilename: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.keyphrase}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Keyphrase to search"
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "LOGCHECK",
                        keyphrase: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "LOGCHECK")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {platform === "ZIMBRA" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>Zimbra</h2>
              <form onSubmit={() => testSubmit()}>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.license}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="License"
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "ZIMBRA",
                        license: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={databaseDictState.services}
                    fullWidth
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Services"
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "ZIMBRA",
                        services: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "ZIMBRA")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {platform === "MAILQUEUE" ? (
            <div>
              <CloseIcon
                className={classes.closeSvg}
                onClick={toggleDrawer(anchor, false)}
              />
              <h2>Mail Queue</h2>
              <form onSubmit={() => testSubmit()}>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    fullWidth
                    value={databaseDictState.zimbra}
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Zimbra"
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "MAILQUEUE",
                        zimbra: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <ListItem style={{ padding: "0px" }}>
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    fullWidth
                    value={databaseDictState.postfix}
                    required
                    type="text"
                    className={classes.drawerTextField}
                    variant="filled"
                    size="small"
                    label="Postfix"
                    onChange={(event) =>
                      setDatabaseDictState({
                        ...databaseDictState,
                        service: "MAILQUEUE",
                        postfix: event.target.value,
                      })
                    }
                  />
                </ListItem>
                <h3>{showSubmitMsg}</h3>
                <Button
                  className={classes.blockSubmit}
                  type="submit"
                  onClick={(databaseDict["service"] = "MAILQUEUE")}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
        </List>
      </div>
    );
  };

  function section1() {
    return loading ? (
      <Spinner />
    ) : (
      <Grid>
        <Grid container>
          <Grid item xs={6} md={6} lg={6}>
            <h1 className={classes.label}>Edit Configured Services</h1>
            <h2 className={classes.ServicesLabel}>Nodes</h2>
          </Grid>

          <Grid container item xs={6} md={6} lg={6} style={{textAlign: "right"}}>
            <Grid item xs={12} md={12} lg={12}>
              <Button
                className={classes.backBtn}
                onClick={() => history.push("/MonitoringServices")}
              >
                BACK
              </Button>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <TextField
                className={classes.editTextField}
                type="search"
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Table className={Styles} className={classes.table}>
            <Thead className={classes.tableHead}>
              <Tr>
                <Th>NODE NAME</Th>
                <Th>FQDN</Th>
                <Th>IP ADDRESS</Th>
                <Th>PLATFORM</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            {nodes
              .filter(
                (node) =>
                  node.name.toLowerCase().includes(search.toLowerCase()) ||
                  node.ipaddress.toLowerCase().includes(search.toLowerCase()) ||
                  node.fqdn.toLowerCase().includes(search.toLowerCase())
              )
              .map((node, index) => (
                <Tbody className={classes.tableBody}>
                  <Tr>
                    <Td className={classes.tableBody} key={index}>{node.name}</Td>

                    <Td className={classes.tableBody} key={index}>{node.fqdn}</Td>

                    <Td className={classes.tableBody}  key={index}>{node.ipaddress}</Td>

                    <Td className={classes.tableBody}>
                      {node.platform_family}
                    </Td>

                    <Td className={classes.tableBody}>
                      <Button
                        className={classes.edtNode}
                        onClick={() =>
                          handleChangeCheck(
                            node.name,
                            node.fqdn,
                            node.ipaddress,
                            node.platform_family
                          )
                        }
                      >
                        EDIT
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              ))}
          </Table>
        </Grid>
      </Grid>
    );
  }

  function section2() {
    return loading ? (
      <Spinner />
    ) : (
      <Grid className={classes.grid}>
        <Grid container style={{ marginTop: "10px" }}>
          <Grid items xs={6} md={6} lg={6} style={{ display: "block" }}>
            <h1 className={classes.label}>Edit Configured Services</h1>
            <h2 className={classes.ServicesLabel}>Services</h2>
          </Grid>

          <Grid items xs={6} md={6} lg={6} style={{ textAlign: "right" }}>
            <Button className={classes.backBtn} onClick={backSec1}>
              BACK
            </Button>
            <br />
            <Button className={classes.deleteBtn} onClick={submitDelete}>
              DELETE
            </Button>
          </Grid>
        </Grid>

        <Grid style={{ marginTop: "20px" }}>
          <Grid container direction="row" justify="flex-start">
            {services.map((service) => {
              let service_name = "";
              switch (service.service_type) {
                case "PORT":
                  service_name = "Port";
                  break;
                case "HTTP":
                  service_name = "HTTP";
                  break;
                case "CIFS":
                  service_name = "CIFS Mount";
                  break;
                case "NFS":
                  service_name = "NFS Mount";
                  break;
                case "NTP":
                  service_name = "NTP";
                  break;
                case "DATABASE":
                  service_name = "Database";
                  break;
                case "DATABASEREPLICATIONSTATUS":
                  service_name = "Database Replication Status";
                  break;
                case "APPLICATIONPROCESS":
                  service_name = "Application Process";
                  break;
                case "NETWORKINTERFACE":
                  service_name = "Network Interface Name";
                  break;
                case "PROXY":
                  service_name = "Proxy";
                  break;
                case "LOGCHECK":
                  service_name = "Log Check";
                  break;
                case "ZIMBRA":
                  service_name = "Zimbra";
                  break;
                case "MAILQUEUE":
                  service_name = "Mail Queue";
                  break;
                case "SSLCERT":
                  service_name = "SSL Cert";
                  break;
              }

              return (
                <div className={classes.blockEdit2}>
                  <div style={{ display: "flex" }}>
                    <Checkbox
                      inputProps={{ "aria-label": "primary checkbox" }}
                      className={classes.subCheckBox}
                      onChange={(event) =>
                        handleChangeDelete(
                          selectedNode.NodeQualifiedFullHostname,
                          selectedNode.fqdn,
                          selectedNode.ipaddress,
                          selectedNode.platform,
                          service.service_type,
                          event
                        )
                      }
                    />
                    <h2>{service_name}</h2>
                  </div>
                  <Button
                    className={classes.editServicesBtn}
                    style={{ marginBottom: "1px" }}
                    onClick={toggleDrawer(
                      "right",
                      true,
                      service.service_type,
                      service.service_data
                    )}
                  >
                    EDIT
                  </Button>
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    );
  }
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <main>
        {sec1 === true ? section1() : null}
        {sec2 === true ? section2() : null}
      </main>

      <div className={classes.list}>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          classes={{ paper: classes.MuiDrawer }}
        >
          {list("right")}
        </Drawer>
      </div>
    </div>
  );
};
