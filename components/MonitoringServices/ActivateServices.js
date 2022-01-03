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

import { Table, Thead, Tbody, Tr, Td } from "react-super-responsive-table";
import Styles from "components/MonitoringServices/Styles.css";

export default () => {
  const classes = useStyles();
  const [sec1, setSec1] = useState(true);
  const [sec2, setSec2] = useState(false);
  const [platform, setPlatform] = useState("");
  const [, setOpen] = React.useState(false);
  const [array, setArray] = useState([]);
  const [host, setHost] = useState([]);
  const [next] = useState({ id: '"0"' });
  const [nodes, setNodes] = useState();
  const [activeNodes, setActiveNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [checkboxStates, setCheckboxStates] = useState({
    PORT: false,
    HTTP: false,
    SSLCERT: false,
    CIFS: false,
    NFS: false,
    NTP: false,
    DATABASE: false,
    DATABASEREPLICATIONSTATUS: false,
    APPLICATIONPROCESS: false,
    NETWORKINTERFACE: false,
    PROXY: false,
    LOGCHECK: false,
    ZIMBRA: false,
    MAILQUEUE: false,
  });

  let databaseDict = {};
  const [state, setState] = React.useState({
    right: false,
  });
  const history = useHistory();

  useEffect(() => {
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
          API.get(ApiData.name, "/node-management/get-nodes", options)
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

  function buttonClickSec1() {
    if (activeNodes.length) {
      setArray([]);
      setSec1(false);
      setSec2(true);
      setCheckboxStates({
        PORT: false,
        HTTP: false,
        SSLCERT: false,
        CIFS: false,
        NFS: false,
        NTP: false,
        DATABASE: false,
        DATABASEREPLICATIONSTATUS: false,
        APPLICATIONPROCESS: false,
        NETWORKINTERFACE: false,
        PROXY: false,
        LOGCHECK: false,
        ZIMBRA: false,
        MAILQUEUE: false,
      });
    }
  }

  function backSec1() {
    setArray([]);
    setSec2(false);
    setSec1(true);
  }

  const Th = withStyles((theme) => ({
    head: {
      color: theme.palette.common.white,
      fontSize: 15,
    },
  }))(TableCell);

  const toggleDrawer = (anchor, open, type) => {
    setPlatform(type);
    let originalCheckBoxStates = checkboxStates;
    originalCheckBoxStates[type] = open;
    setCheckboxStates(originalCheckBoxStates);

    if (open === false && type !== "" && type !== undefined) {
      let nodesAfterSlice = [];
      array.map((node) => {
        if (node.service !== type) {
          nodesAfterSlice.push(node);
        }
      });
      setArray(nodesAfterSlice);
    }
    setState({ ...state, [anchor]: open });
  };

  function selectAll() {
    if (nodes.length) {
      setActiveNodes([...activeNodes, ...nodes]);
      setNodes([]);
      setHost([...host, ...nodes]);
    }
  }

  function deSelectAll() {
    if (activeNodes.length) {
      setActiveNodes([]);
      setNodes([...nodes, ...activeNodes]);
      setHost([]);
    }
  }

  function handleCheckedOnChange(selectedNode, action) {
    if (action === "add") {
      let nodesAfterSlice = nodes;

      nodes.map((node, index) => {
        if (node.name === selectedNode.name) {
          nodesAfterSlice.splice(index, 1);
          setNodes(nodesAfterSlice);
          setActiveNodes([...activeNodes, selectedNode]);
          setHost([...host, selectedNode]);
        }
      });
    } else {
      let nodesAfterSlice = activeNodes;
      activeNodes.map((node, index) => {
        if (node.name === selectedNode.name) {
          nodesAfterSlice.splice(index, 1);
          setActiveNodes(nodesAfterSlice);
          setNodes([selectedNode, ...nodes]);
          setHost(nodesAfterSlice);
        }
      });
    }
  }

  function submit() {
    if (array.length) {
      let host_name_list = [];
      host.map((hostData, index) => {
        let new_host_name = {
          NodeQualifiedFullHostname: hostData.name,
        };
        host_name_list.push(new_host_name);
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
              body: {
                nodes: array,
                action: "create",
                nodelist: host_name_list,
              },
            };

            API.post(ApiData.name, `/service-config/create-service`, options)
              .then((res) => {
                if (res.data === "success") {
                  history.push({
                    pathname: "/finishedServiceConfiguration",
                  });
                } else {
                  history.push({
                    pathname: "/nodesNotConfigured",
                  });
                }
                setLoading(false);
              })
              .catch((error) => {
                setLoading(false);
                console.log(error.response);
              })
              .finally(() => {
                setLoading(false);
              });
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }

  const handleChange = (event) => {
    databaseDict["databaseType"] = event.target.value;
  };

  const testSubmit = (type) => {
    let newHostServiceArray = [];
    host.map((hostData, index) => {
      let new_host = {
        NodeQualifiedFullHostname: hostData.name,
        fqdn: hostData.fqdn,
        ip: hostData.ipaddress,
        platform: hostData.platform_family,
      };
      let theObj = Object.assign({}, new_host, databaseDict);
      newHostServiceArray.push(theObj);
    });
    setArray([...array, ...newHostServiceArray]);
    toggleDrawer("right", false, "");
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={(event) => toggleDrawer(anchor, false)}
    >
      <List>
        {platform === "PORT" ? (
          <div>
            <CloseIcon
              className={classes.closeIcon}
              onClick={(event) => toggleDrawer(anchor, false, "PORT")}
            />
            <h2>Port</h2>
            <form onSubmit={() => testSubmit()}>
              <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  required
                  type="text"
                  className={classes.drawerTextField}
                  variant="filled"
                  size="small"
                  label="Port Number"
                  onChange={(event) =>
                    (databaseDict["portnumber"] = event.target.value)
                  }
                />
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "PORT")}
              >
                SAVE
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
              onClick={(event) => toggleDrawer(anchor, false, "HTTP")}
            />
            <h2>HTTP</h2>
            <form onSubmit={() => testSubmit()}>
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
                  label="Domain Name"
                  onChange={(event) =>
                    (databaseDict["httpdomain"] = event.target.value)
                  }
                />
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "HTTP")}
              >
                SAVE
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
              onClick={(event) => toggleDrawer(anchor, false, "SSLCERT")}
            />
            <h2>SSL Cert</h2>
            <form onSubmit={() => testSubmit()}>
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
                  label="Domain Name"
                  onChange={(event) =>
                    (databaseDict["ssldomain"] = event.target.value)
                  }
                />
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "SSLCERT")}
              >
                SAVE
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
              onClick={(event) => toggleDrawer(anchor, false, "CIFS")}
            />
            <h2>CIFS Mount</h2>
            <form onSubmit={() => testSubmit()}>
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
                  label="Mount point/ops/var"
                  onChange={(event) =>
                    (databaseDict["path"] = event.target.value)
                  }
                />
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "CIFS")}
              >
                SAVE
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
              onClick={(event) => toggleDrawer(anchor, false, "NFS")}
            />
            <h2>NFS Mount</h2>
            <form onSubmit={() => testSubmit()}>
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
                  label="Mount point/ops/var"
                  onChange={(event) =>
                    (databaseDict["path"] = event.target.value)
                  }
                />
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "NFS")}
              >
                SAVE
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
              onClick={(event) => toggleDrawer(anchor, false, "NTP")}
            />
            <h2>NTP</h2>
            <form onSubmit={() => testSubmit()}>
              <ListItem style={{ padding: "0px" }}>
                <Checkbox
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  className={classes.drawerCheckBox}
                  onChange={(event) =>
                    (databaseDict["ntpstatus"] = event.target.checked)
                  }
                />
                <h3>Switch on</h3>
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "NTP")}
              >
                SAVE
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
              onClick={(event) => toggleDrawer(anchor, false, "DATABASE")}
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
                      onChange={handleChange}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                    >
                      <FormControlLabel
                        style={{ padding: "0px" }}
                        value="mysql"
                        control={<Radio className={classes.drawerCheckBox} />}
                        label="MySQL"
                      />
                      <FormControlLabel
                        style={{ padding: "0px" }}
                        value="oracle"
                        control={<Radio className={classes.drawerCheckBox} />}
                        label="Oracle"
                      />
                      <FormControlLabel
                        style={{ padding: "0px" }}
                        value="postgresql"
                        control={<Radio className={classes.drawerCheckBox} />}
                        label="PostgreSQL"
                      />
                      <FormControlLabel
                        style={{ padding: "0px" }}
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
                  type="text"
                  className={classes.drawerTextField}
                  variant="filled"
                  size="small"
                  label="Database"
                  onChange={(event) =>
                    (databaseDict["databaseType"] = event.target.value)
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
                  fullWidth
                  required
                  type="text"
                  className={classes.drawerTextField}
                  variant="filled"
                  size="small"
                  label="Port"
                  onChange={(event) =>
                    (databaseDict["portnumber"] = event.target.value)
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
                  onChange={(event) =>
                    (databaseDict["databasestring"] = event.target.value)
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
                  onChange={(event) =>
                    (databaseDict["username"] = event.target.value)
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
                  onChange={(event) =>
                    (databaseDict["password"] = event.target.value)
                  }
                />
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "DATABASE")}
              >
                SAVE
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
              onClick={(event) =>
                toggleDrawer(anchor, false, "DATABASEREPLICATIONSTATUS")
              }
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
                      onChange={handleChange}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                    >
                      <FormControlLabel
                        style={{ padding: "0px" }}
                        value="mysql"
                        control={<Radio className={classes.drawerCheckBox} />}
                        label="MySQL"
                      />
                      <FormControlLabel
                        style={{ padding: "0px" }}
                        value="oracle"
                        control={<Radio className={classes.drawerCheckBox} />}
                        label="Oracle"
                      />
                      <FormControlLabel
                        style={{ padding: "0px" }}
                        value="postgresql"
                        control={<Radio className={classes.drawerCheckBox} />}
                        label="PostgreSQL"
                      />
                      <FormControlLabel
                        style={{ padding: "0px" }}
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
                  type="text"
                  className={classes.drawerTextField}
                  variant="filled"
                  size="small"
                  label="Database"
                  onChange={(event) =>
                    (databaseDict["databaseType"] = event.target.value)
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
                  fullWidth
                  required
                  type="text"
                  className={classes.drawerTextField}
                  variant="filled"
                  size="small"
                  label="Port"
                  onChange={(event) =>
                    (databaseDict["portnumber"] = event.target.value)
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
                  onChange={(event) =>
                    (databaseDict["databasestring"] = event.target.value)
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
                  onChange={(event) =>
                    (databaseDict["username"] = event.target.value)
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
                  onChange={(event) =>
                    (databaseDict["password"] = event.target.value)
                  }
                />
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={
                  (databaseDict["service"] = "DATABASEREPLICATIONSTATUS")
                }
              >
                SAVE
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
              onClick={(event) =>
                toggleDrawer(anchor, false, "APPLICATIONPROCESS")
              }
            />
            <h2>Application Process</h2>
            <form onSubmit={() => testSubmit()}>
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
                  label="Application Name"
                  onChange={(event) =>
                    (databaseDict["applicationname"] = event.target.value)
                  }
                />
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "APPLICATIONPROCESS")}
              >
                SAVE
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
              onClick={(event) =>
                toggleDrawer(anchor, false, "NETWORKINTERFACE")
              }
            />
            <h2>Network Interface Name</h2>
            <form onSubmit={() => testSubmit()}>
              <ListItem style={{ padding: "0px" }}>
                <TextField
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  fullWidth
                  required
                  type="text"
                  label="Network Interface Name"
                  className={classes.drawerTextField}
                  variant="filled"
                  size="small"
                  onChange={(event) =>
                    (databaseDict["networkinterfacename"] = event.target.value)
                  }
                />
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "NETWORKINTERFACE")}
              >
                SAVE
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
              onClick={(event) => toggleDrawer(anchor, false, "PROXY")}
            />
            <h2>Proxy</h2>
            <form onSubmit={() => testSubmit()}>
              <ListItem style={{ padding: "0px" }}>
                <Checkbox
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  className={classes.drawerCheckBox}
                  onChange={(event) =>
                    (databaseDict["proxystatus"] = event.target.checked)
                  }
                />
                <h3>Switch on</h3>
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "PROXY")}
              >
                SAVE
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
              onClick={(event) => toggleDrawer(anchor, false, "LOGCHECK")}
            />
            <h2>Log Check</h2>
            <form onSubmit={() => testSubmit()}>
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
                  label="Log File Name"
                  onChange={(event) =>
                    (databaseDict["logfilename"] = event.target.value)
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
                  label="Keyphrase to search"
                  onChange={(event) =>
                    (databaseDict["keyphrase"] = event.target.value)
                  }
                />
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "LOGCHECK")}
              >
                SAVE
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
              onClick={(event) => toggleDrawer(anchor, false, "ZIMBRA")}
            />
            <h2>Zimbra</h2>
            <form onSubmit={() => testSubmit()}>
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
                  label="License"
                  onChange={(event) =>
                    (databaseDict["license"] = event.target.value)
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
                  label="Services"
                  onChange={(event) =>
                    (databaseDict["services"] = event.target.value)
                  }
                />
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "ZIMBRA")}
              >
                SAVE
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
              onClick={(event) => toggleDrawer(anchor, false, "MAILQUEUE")}
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
                  required
                  type="text"
                  className={classes.drawerTextField}
                  variant="filled"
                  size="small"
                  label="Zimbra"
                  onChange={(event) =>
                    (databaseDict["zimbra"] = event.target.value)
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
                  label="Postfix"
                  onChange={(event) =>
                    (databaseDict["postfix"] = event.target.value)
                  }
                />
              </ListItem>
              <Button
                className={classes.blockSubmit}
                type="submit"
                onClick={(databaseDict["service"] = "MAILQUEUE")}
              >
                SAVE
              </Button>
            </form>
          </div>
        ) : (
          ""
        )}
      </List>
    </div>
  );

  function section1() {
    return loading ? (
      <Spinner />
    ) : (
      <Grid>
        <Grid container className={classes.activeMain}>
          <Grid xs>
            <h1 className={classes.label}>Activate Services</h1>
            <h2 className={classes.ServicesLabel}>Node Selection</h2>
          </Grid>

          <Grid xs className={classes.activeSub}>
            <Grid xs={12}>
              <TextField
                className={classes.searchActivateServices}
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

            <Grid items xs={12}>
              <div className={classes.btnDiv}>
                <Button className={classes.selectBtn} onClick={selectAll}>
                  SELECT ALL
                </Button>
                <Button className={classes.deselectBtn} onClick={deSelectAll}>
                  DESELECT ALL
                </Button>
                <br />
                <Button className={classes.nextBtn} onClick={buttonClickSec1}>
                  NEXT
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid style={{ marginTop: "20px" }}>
          <h2 className={classes.label}>Selected</h2>
          <Table className={Styles} className={classes.table}>
            <Thead className={classes.tableHead}>
              <Tr>
                <Th>Select</Th>
                <Th>NODE NAME</Th>
                <Th>FQDN</Th>
                <Th>IP ADDRESS</Th>
                <Th>PLATFORM</Th>
              </Tr>
            </Thead>
            {activeNodes.map((node, index) => (
              <Tbody className={classes.tableBody}>
                <Tr>
                  <Td className={classes.tableBody}>
                    <Checkbox
                      inputProps={{ "aria-label": "primary checkbox" }}
                      className={classes.checkBox}
                      onChange={() => {
                        handleCheckedOnChange(node, "remove");
                      }}
                      checked={true}
                    />
                  </Td>
                  <Td className={classes.tableBody} >{node.name}</Td>
                  <Td className={classes.tableBody}>{node.fqdn}</Td>
                  <Td className={classes.tableBody}>{node.ipaddress}</Td>
                  <Td className={classes.tableBody}>{node.platform_family}</Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </Grid>

        <Grid style={{ marginTop: "30px" }}>
          <h2 className={classes.label}>Unselected</h2>
          <Table className={Styles} className={classes.table}>
            <Thead className={classes.tableHead}>
              <Tr>
                <Th>Select</Th>
                <Th>NODE NAME</Th>
                <Th>FQDN</Th>
                <Th>IP ADDRESS</Th>
                <Th>PLATFORM</Th>
              </Tr>
            </Thead>

            {nodes.filter((node) => node.name !== "" ? node.name.toLowerCase().includes(search.toLowerCase()): node.name.includes(search)
               || node.ipaddress !== "" ? node.ipaddress.toLowerCase().includes(search.toLowerCase()): node.ipaddress.includes(search)
               || node.fqdn !=="" ? node.fqdn.toLowerCase().includes(search.toLowerCase()): node.fqdn.includes(search)).map((node, index) => (
                <Tbody className={classes.tableBody}>
                  <Tr>
                    <Td className={classes.tableBody}>
                      <Checkbox
                        inputProps={{ "aria-label": "primary checkbox" }}
                        className={classes.checkBox}
                        onChange={() => {
                          handleCheckedOnChange(node, "add");
                        }}
                        checked={false}
                      />
                    </Td>
                    <Td className={classes.tableBody}>{node.name}</Td>
                    <Td className={classes.tableBody}>{node.fqdn}</Td>
                    <Td className={classes.tableBody}>{node.ipaddress}</Td>
                    <Td className={classes.tableBody}>
                      {node.platform_family}
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
    return (
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <Grid className={classes.grid}>
            <Grid container>
              <Grid item xs={6} md={6} lg={6} style={{ display: "block" }}>
                <h1 className={classes.label}>Activate Services</h1>
                <h2 className={classes.ServicesLabel}>Services</h2>
              </Grid>

              <Grid container item xs={6} md={6} lg={6} style={{ textAlign: "right" }}>
                <Grid item xs={12}>
                  <Button className={classes.backBtn} onClick={backSec1}>
                    BACK
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    className={classes.submitMainBtn}
                    onClick={() => submit()}
                  >
                    SUBMIT
                  </Button>
                </Grid>
              </Grid>
            </Grid>

              <Grid container>
                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer("right", event.target.checked, "PORT")
                    }
                    checked={checkboxStates.PORT}
                  />
                  <h2>Port</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer("right", event.target.checked, "HTTP")
                    }
                    checked={checkboxStates.HTTP}
                  />
                  <h2>HTTP</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer("right", event.target.checked, "SSLCERT")
                    }
                    checked={checkboxStates.SSLCERT}
                  />
                  <h2>SSL Cert</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer("right", event.target.checked, "CIFS")
                    }
                    checked={checkboxStates.CIFS}
                  />
                  <h2>CIFS Mount</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer("right", event.target.checked, "NFS")
                    }
                    checked={checkboxStates.NFS}
                  />
                  <h2>NFS Mount</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer("right", event.target.checked, "NTP")
                    }
                    checked={checkboxStates.NTP}
                  />
                  <h2>NTP</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer("right", event.target.checked, "DATABASE")
                    }
                    checked={checkboxStates.DATABASE}
                  />
                  <h2>Database</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer(
                        "right",
                        event.target.checked,
                        "DATABASEREPLICATIONSTATUS"
                      )
                    }
                    checked={checkboxStates.DATABASEREPLICATIONSTATUS}
                  />
                  <h2>Database Replication Status</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer(
                        "right",
                        event.target.checked,
                        "APPLICATIONPROCESS"
                      )
                    }
                    checked={checkboxStates.APPLICATIONPROCESS}
                  />
                  <h2>Application Process</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer(
                        "right",
                        event.target.checked,
                        "NETWORKINTERFACE"
                      )
                    }
                    checked={checkboxStates.NETWORKINTERFACE}
                  />
                  <h2>Network Interface Name</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer("right", event.target.checked, "PROXY")
                    }
                    checked={checkboxStates.PROXY}
                  />
                  <h2>Proxy</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer("right", event.target.checked, "LOGCHECK")
                    }
                    checked={checkboxStates.LOGCHECK}
                  />
                  <h2>Log Check</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer("right", event.target.checked, "ZIMBRA")
                    }
                    checked={checkboxStates.ZIMBRA}
                  />
                  <h2>Zimbra</h2>
                </div>

                <div className={classes.block}>
                  <Checkbox
                    inputProps={{ "aria-label": "primary checkbox" }}
                    className={classes.subCheckBox}
                    onClick={(event) =>
                      toggleDrawer("right", event.target.checked, "MAILQUEUE")
                    }
                    checked={checkboxStates.MAILQUEUE}
                  />
                  <h2>Mail Queue</h2>
                </div>
              </Grid>
          </Grid>
        )}
      </div>
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
          classes={{ paper: classes.MuiDrawer }}
        >
          {list("right")}
        </Drawer>
      </div>
    </div>
  );
};
