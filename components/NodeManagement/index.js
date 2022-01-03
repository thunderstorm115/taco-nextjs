import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./useStylesNodeMan";
import Spinner from "components/User/Spinner";
import { API } from "aws-amplify";
import config from "UserPoolAmplify";
import { Auth } from "aws-amplify";
import { Button, Grid } from "@material-ui/core";
import { Checkbox, TextField } from "@material-ui/core";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Styles from "components/NodeManagement/NodeManageStyles.css";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { Context } from "components/NodeManagement/store";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default () => {
  const classes = useStyles();
  const [drawer, setDrawer] = React.useState({
    right: false,
  });
  const [loading, setLoading] = useState(true);
  const [loadingCsv, setLoadingCSV] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [, setCompany] = useState();
  const history = useHistory();
  const [platform, setPlatform] = useState("");
  const [domain, setDomain] = useState("");
  const [ip, setIP] = useState("");
  const [oldDomain, setOldDomain] = useState("");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [nodes, setNodes] = useState([]);
  const [showSubmitMsg, setShowSubmitMsg] = useState("");
  const [search, setSearch] = useState("");
  const [hostProvider, setHostingProvider] = useState("");
  const [value, setValue] = React.useState("");
  const [activeNodes, setActiveNodes] = useState([]);
  const [nodeIP, setNodeIP] = useState("");
  const [, setNodeFQDN] = useState("");
  const [nodeName, setNodeName] = useState("");
  const [nodePlatform, setNodePatfrom] = useState("");
  const [loadingRefresh, setLoadingRefresh] = React.useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const handleRadioChange = (event) => {
    setHostingProvider(event.target.value);
    setValue(event.target.value);
  };

  const getNodeData = async (options) => {
    let temp_array = [];
    const ApiData = config.APIDetails.endpoints[0];
    try {
      const res = await API.get(
        ApiData.name,
        "/node-management/get-nodes",
        options
      );
      if (res.data !== undefined && res.data !== null) {
        res.data.map((node) => {
          let new_node = {
            NodeQualifiedFullHostname: node.name,
            fqdn: node.fqdn,
            NodeIP: node.ipaddress,
            HostingProvider: node.platform_family,
          };
          temp_array.push(new_node);
        });
      } else {
        setLoading(!loading);
      }
      setNodes(temp_array);
    } catch (e) {
      console.error(e);
    }
  };

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
        const companyData = await API.get(
          ApiData.name,
          `/users/cognito-retrieve`,
          options
        );
        setCompany(companyData.data.company_name);
        await getNodeData(options);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleClickOpen = (theNodeName, theFqdn, theIp, thePlat) => {
    setShowMsg(false);
    setNodeName(theNodeName);
    setNodeFQDN(theFqdn);
    setNodeIP(theIp);
    setNodePatfrom(thePlat);
    setOldDomain(theNodeName);
    setIP(theIp);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuSubmit = () => {
    setMenuOpen(false);
    toggleDrawer("right", true, hostProvider, nodeName, nodeIP);
  };

  const toggleDrawer = (anchor, open, type, domainName, IP) => {
    setShowSubmitMsg("");
    setPlatform(type);
    setDomain(domainName);
    setDrawer({ ...drawer, [anchor]: open });
  };

  function checkHost() {
    let thebodydata = {
      HostingProvider: hostProvider,
      NodeIP: ip,
      OperatingSystem: nodePlatform,
      NodeQualifiedFullHostname: domain,
      OperatingSystemVersion: "",
      SSHUsername: Context._currentValue.SSHUsername,
      SSHPassword: Context._currentValue.SSHPassword,
      PublicKey: Context._currentValue.PublicKey,
      SudoPassword: Context._currentValue.SudoPassword,
      SudoOptions: Context._currentValue.SudoOptions,
      RootPassword: Context._currentValue.RootPassword,
      TCPPort443: Context._currentValue.TCPPort443,
      TCPPort22: Context._currentValue.TCPPort22,
      TCPPort5985: Context._currentValue.TCPPort5985,
      TCPPort5986: Context._currentValue.TCPPort5986,
      WinRMUsername: Context._currentValue.WinRMUsername,
      WinRMPassword: Context._currentValue.WinRMPassword,
      AWSServiceType: Context._currentValue.AWSServiceType,
      AWSAccessKeyID: Context._currentValue.AWSAccessKeyID,
      AWSSecretAccessKey: Context._currentValue.AWSSecretAccessKey,
      AzureClientSecret: Context._currentValue.AzureClientSecret,
      AzureTenantID: Context._currentValue.AzureTenantID,
      GCPServiceAccountJSONCredentials:
        Context._currentValue.GCPServiceAccountJSONCredentials,
    };

    if (domain !== oldDomain) {
      thebodydata["OldNodeQualifiedFullHostname"] = oldDomain;
    }
    return thebodydata;
  }

  console.log('nodePlatform', nodePlatform);

  function submit() {
    setLoadingUpdate(true);
    let data = checkHost();

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

            body: data,
          };

          API.post(ApiData.name, `/node-config/upload?action=update`, options)
            .then((res) => {
            })
            .catch((error) => {
              setLoading(false);
              console.log(error.response);
            })
            .finally(() => {
              setShowMsg(true)
              setShowSubmitMsg(
                "Your node setup is in progress. You will be notified once your node configuration is complete."
              );
              setLoadingUpdate(false);
            });
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }

  function deleteFunction() {
    if (activeNodes.length) {
      setLoadingDelete(true);
     
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
              body: activeNodes,
            };
            API.post(ApiData.name, `/node-config/remove`, options)
              .then((res) => {
              })
              .catch((error) => {
                console.log(error.response);
              })
              .finally(() => {
                history.push("/finishednodedelete");
                setLoadingDelete(false);
              });
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }

  const exceldownload = () => {
    setLoadingCSV(true);
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
          API.get(ApiData.name, `/node-config/download`, options)
            .then((res) => {
              window.open(res.signed_url, "_blank");
            })
            .catch((error) => {
              console.log(error.response);
            })
            .finally(() => {
              setLoadingCSV(false);
            });
        });
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const refreshlist = () => {
    setLoadingRefresh(true);
    setLoading(true);
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
        await getNodeData(options);
        await API.get(
          ApiData.name,
          `/node-management/refresh-node-list`,
          options
        );
        
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingRefresh(false);
        setLoading(false);
      }
    })();
  };

  const handleClose = () => {
    setShowSubmitMsg("");
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => toggleDrawer(anchor, false)}
    >
      <List>
        <Grid container>
          <Grid item xs={11}>
            <h4 style={{ margin: "0px" }} >{nodeName}</h4>
          </Grid>
          <Grid item xs={1} onClick={() => toggleDrawer(anchor, false)}>
            <CloseIcon className={classes.closeIcon} />
          </Grid>
        </Grid>

        {/* ON-PREM LINUX UNIX */}
        {((hostProvider === "prem" && nodePlatform === "linux") || "unix") ===
        true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>On-Prem | Linux/Unix</h4>}
          <form>
              {showMsg ? null :  <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>SSH Credentails</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* ON-PREM AIX */}
        {(hostProvider === "prem" && nodePlatform === "aix") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>On-Prem | AIX</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>SSH Credentails</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* ON-PREM RHEL */}
        {(hostProvider === "prem" && nodePlatform === "rhel") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>On-Prem | Rhel</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>SSH Credentails</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* ON-PREM DEBIAN */}
        {(hostProvider === "prem" && nodePlatform === "debian") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>On-Prem | Debian</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>SSH Credentails</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* AWS Linux/Unix */}
        {((hostProvider === "aws" && nodePlatform === "linux") || "unix") ===
        true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              // e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>AWS | Linux/Unix</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>SSH Credentails</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* AWS AIX*/}

        {(hostProvider === "aws" && nodePlatform === "aix") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              // e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>AWS | AIX</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>SSH Credentails</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* AWS Rhel*/}

        {(hostProvider === "aws" && nodePlatform === "rhel") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              // e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>AWS | Rhel</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>SSH Credentails</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* AWS Debian*/}

        {(hostProvider === "aws" && nodePlatform === "debian") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              // e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>AWS | Debian</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>SSH Credentails</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {(hostProvider === "prem" && nodePlatform === "windows") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>On-Prem | Windows</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>WinRM Credentials</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="WinRM Username"
                  onChange={(event) =>
                    (Context._currentValue.WinRMUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="WinRM Password"
                  onChange={(event) =>
                    (Context._currentValue.WinRMPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {(hostProvider === "aws" && nodePlatform === "windows") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>AWS | Windows</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>AWS Details</h4>}
              {showMsg ? null : <ListItem>
                <FormControl className={classes.dropDown}>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    
                    value={"Service Type"}
                    inputProps={{
                      name: "Service Type",
                      id: "age-native-simple",
                    }}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    // value={nodeType}
                    onChange={(event) =>
                      (Context._currentValue.WinRMPassword = event.target.value)
                    }
                    className={classes.dropDownInner}
                  >
                    <MenuItem value="Service Type">
                      <em>Service Type</em>
                    </MenuItem>
                    <MenuItem value={"api"}>API</MenuItem>
                    <MenuItem value={"ecs"}>ECS</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="AWS Access Key ID"
                  onChange={(event) =>
                    (Context._currentValue.AWSAccessKeyID = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="AWS Secret Access Key"
                  onChange={(event) =>
                    (Context._currentValue.AWSSecretAccessKey =
                      event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>WinRM Credentials</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="WinRM Username"
                  onChange={(event) =>
                    (Context._currentValue.WinRMUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="WinRM Password"
                  onChange={(event) =>
                    (Context._currentValue.WinRMPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* Azure Linux/Unix */}
        {((hostProvider === "azure" && nodePlatform === "linux") || "unix") ===
        true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>Azure | Linux/Unix</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>Azure Details</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Tennant ID"
                  onChange={(event) =>
                    (Context._currentValue.AzureTenantID = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Client Secret"
                  onChange={(event) =>
                    (Context._currentValue.AzureClientSecret =
                      event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>SSH Credentails</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* Azure Aix */}
        {(hostProvider === "azure" && nodePlatform === "aix") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>Azure | Aix</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>Azure Details</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Tennant ID"
                  onChange={(event) =>
                    (Context._currentValue.AzureTenantID = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Client Secret"
                  onChange={(event) =>
                    (Context._currentValue.AzureClientSecret =
                      event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>SSH Credentails</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* Azure Rhel */}
        {(hostProvider === "azure" && nodePlatform === "rhel") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>Azure | Rhel</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>Azure Details</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Tennant ID"
                  onChange={(event) =>
                    (Context._currentValue.AzureTenantID = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Client Secret"
                  onChange={(event) =>
                    (Context._currentValue.AzureClientSecret =
                      event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>SSH Credentails</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}

              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* Azure Debian */}
        {(hostProvider === "azure" && nodePlatform === "debian") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>Azure | Debian</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>Azure Details</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Tennant ID"
                  onChange={(event) =>
                    (Context._currentValue.AzureTenantID = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Client Secret"
                  onChange={(event) =>
                    (Context._currentValue.AzureClientSecret =
                      event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>SSH Credentails</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* Azure Windows */}
        {(hostProvider === "azure" && nodePlatform === "windows") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>Azure | Windows</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>Azure Details</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Tennant ID"
                  onChange={(event) =>
                    (Context._currentValue.AzureTenantID = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Client Secret"
                  onChange={(event) =>
                    (Context._currentValue.AzureClientSecret =
                      event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>WinRM Credentials</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="WinRM Username"
                  onChange={(event) =>
                    (Context._currentValue.WinRMUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="WinRM Password"
                  onChange={(event) =>
                    (Context._currentValue.WinRMPassword = event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* GCP Linux/Unix */}
        {((hostProvider === "google" && nodePlatform === "linux") || "unix") ===
        true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>GCP | Linux/Unix</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}

              {showMsg ? null : <h4 className={classes.SSHLabel}>GCP Details</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  className={classes.gridTextField}
                  id="outlined-multiline-static"
                  multiline
                  rows={10}
                  variant="outlined"
                  onChange={(event) =>
                    (Context._currentValue.GCPServiceAccountJSONCredentials =
                      event.target.value)
                  }
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* GCP Aix */}
        {(hostProvider === "google" && nodePlatform === "aix") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>GCP | Aix</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>GCP Details</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  className={classes.gridTextField}
                  id="outlined-multiline-static"
                  multiline
                  rows={10}
                  variant="outlined"
                  onChange={(event) =>
                    (Context._currentValue.GCPServiceAccountJSONCredentials =
                      event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* GCP Rhel */}
        {(hostProvider === "google" && nodePlatform === "rhel") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>GCP | Rhel</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>GCP Details</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  className={classes.gridTextField}
                  id="outlined-multiline-static"
                  multiline
                  rows={10}
                  variant="outlined"
                  onChange={(event) =>
                    (Context._currentValue.GCPServiceAccountJSONCredentials =
                      event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* GCP Debian */}
        {(hostProvider === "google" && nodePlatform === "debian") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>GCP | Debian</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}

              {showMsg ? null : <h4 className={classes.SSHLabel}>GCP Details</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  className={classes.gridTextField}
                  id="outlined-multiline-static"
                  multiline
                  rows={10}
                  variant="outlined"
                  onChange={(event) =>
                    (Context._currentValue.GCPServiceAccountJSONCredentials =
                      event.target.value)
                  }
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Username"
                  onChange={(event) =>
                    (Context._currentValue.SSHUsername = event.target.value)
                  }
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="SSH Password"
                  onChange={(event) =>
                    (Context._currentValue.SSHPassword = event.target.value)
                  }
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Public Key"
                  onChange={(event) =>
                    (Context._currentValue.PublicKey = event.target.value)
                  }
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Password"
                  onChange={(event) =>
                    (Context._currentValue.SudoPassword = event.target.value)
                  }
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Sudo Options"
                  onChange={(event) =>
                    (Context._currentValue.SudoOptions = event.target.value)
                  }
                />
              </ListItem>}

                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Root Password"
                  onChange={(event) =>
                    (Context._currentValue.RootPassword = event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}

        {/* GCP Windows */}
        {(hostProvider === "google" && nodePlatform === "windows") === true ? ( //Linux/Unix
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {showMsg ? null : <h4 className={classes.containerLabel}>Node Detail</h4>}
            {showMsg ? null : <h4 style={{ margin: "0px" }}>GCP | Windows</h4>}
          <form>
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="IP Address"
                  defaultValue={ip}
                  onChange={(event) => setIP(event.target.value)}
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="Qualified Full Hostname"
                  defaultValue={nodeName}
                  onChange={(event) => setDomain(event.target.value)}
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>GCP Details</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  
                  className={classes.gridTextField}
                  id="outlined-multiline-static"
                  multiline
                  rows={10}
                  variant="outlined"
                  onChange={(event) =>
                    (Context._currentValue.GCPServiceAccountJSONCredentials =
                      event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : <h4 className={classes.SSHLabel}>WinRM Credentials</h4>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="text"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="WinRM Username"
                  onChange={(event) =>
                    (Context._currentValue.WinRMUsername = event.target.value)
                  }
                />
              </ListItem>}
                {showMsg ? null : <ListItem style={{ padding: "0px" }}>
                <TextField
                  fullWidth
                  type="password"
                  className={classes.gridTextField}
                  variant="filled"
                  size="small"
                  label="WinRM Password"
                  onChange={(event) =>
                    (Context._currentValue.WinRMPassword = event.target.value)
                  }
                />
              </ListItem>}
              {showMsg ? null : 
              <ListItem>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={submit}
                >
                  {loadingUpdate ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </Button>
              </ListItem>}

              <div>
                <h4>{showSubmitMsg}</h4>
              </div>

              {showMsg ?               
              <ListItem style={{ padding: "0px" }}>
                <Button
                  fullWidth
                  className={classes.submitButton}
                  type="submit"
                  onClick={() => toggleDrawer(anchor, false)}
                >
                    <div>CLOSE</div>
                </Button>
              </ListItem> : null}
            </form>
          </div>
        ) : (
          ""
        )}
      </List>
    </div>
  );

  
  function handleCheckedOnChange(selectedNode, action) {
    if (action === "add") {
      let nodesAfterSlice = nodes;

      nodes.map((node, index) => {
        if (
          node.NodeQualifiedFullHostname ===
          selectedNode.NodeQualifiedFullHostname
        ) {
          nodesAfterSlice.splice(index, 1);
          setNodes(nodesAfterSlice);
          setActiveNodes([...activeNodes, selectedNode]);
        }
      });
    } else {
      let nodesAfterSlice = activeNodes;
      activeNodes.map((node, index) => {
        if (
          node.NodeQualifiedFullHostname ===
          selectedNode.NodeQualifiedFullHostname
        ) {
          nodesAfterSlice.splice(index, 1);
          setActiveNodes(nodesAfterSlice);
          setNodes([selectedNode, ...nodes]);
        }
      });
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <main>
        <Grid container spacing={24}>
          <Grid item xs={12} md={12} lg={4}>
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
          </Grid>

          <Grid item xs={12} md={12} lg={8}>
            <Button className={classes.refreshBtn} onClick={refreshlist}>
              {loadingRefresh ? (
                <div className="lds-dual-ring2"></div>
              ) : (
                <div>REFRESH</div>
              )}
            </Button>

            <Button
              className={classes.addNodeButton}
              onClick={() => {
                history.push("/addNodeTerms");
              }}
            >
              ADD NODE
            </Button>

            <Button
              className={classes.csvAdd}
              onClick={() => {
                history.push("/uploadCSV");
              }}
            >
              UPLOAD CSV
            </Button>

            <Button className={classes.downloadExcel} onClick={exceldownload}>
              {loadingCsv ? (
                <div className="lds-dual-ring2"></div>
              ) : (
                <div>DOWNLOAD EXCEL</div>
              )}
            </Button>
          </Grid>
        </Grid>

        {activeNodes.length > 0 ? (
          <Grid>
            <Grid container>
              <Grid item xs={6} md={6} lg={6} className={classes.btnGridText}>
                <h2 className={classes.label}>Select to Delete</h2>
              </Grid>

              <Grid item xs={6} md={6} lg={6} className={classes.btnGridDel}>
                <Button className={classes.deleteBtn} onClick={deleteFunction}>
                  {loadingDelete ? (
                    <div className="lds-dual-ring2"></div>
                  ) : (
                    <div>DELETE</div>
                  )}
                </Button>
              </Grid>
            </Grid>

            {/* <TableContainer component={Paper} className={classes.tableContainer}> */}
            <Table  className={Styles} className={classes.table}>
              <Thead className={classes.tableHead}>
                <Tr>
                  <Th>Select</Th>
                  <Th>Node Name</Th>
                  <Th>FQDN</Th>
                  <Th>IP Address</Th>
                  <Th>Platform</Th>
                  <Th></Th>
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

                    <Td className={classes.tableBody}>
                      {node.NodeQualifiedFullHostname}
                    </Td>

                    <Td className={classes.tableBody}>{node.fqdn}</Td>

                    <Td className={classes.tableBody}>{node.NodeIP}</Td>

                    <Td className={classes.tableBody}>
                      {node.HostingProvider}
                    </Td>

                    <Td className={classes.tableBody}>
                      <Button
                        className={classes.edtNode}
                        onClick={() =>
                          handleClickOpen(
                            node.NodeQualifiedFullHostname,
                            node.fqdn,
                            node.NodeIP,
                            node.HostingProvider
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
            {/* </TableContainer> */}
          </Grid>
        ) : null}

        {nodes.length > 0 ? 
        <>
        <Grid>
          <h2 className={classes.label}>Unselected</h2>
          <Table  className={Styles} className={classes.table}>
            <Thead className={classes.tableHead}>
              <Tr>
                <Th>Select</Th>
                <Th>Node Name</Th>
                <Th>FQDN</Th>
                <Th>IP Address</Th>
                <Th>Platform</Th>
                <Th></Th>
              </Tr>
            </Thead>
            {nodes
              .filter((node) =>
                node.NodeQualifiedFullHostname !== ""
                  ? node.NodeQualifiedFullHostname.toLowerCase().includes(
                      search.toLowerCase()
                    )
                  : node.NodeQualifiedFullHostname.includes(search) ||
                    node.NodeIP !== ""
                  ? node.NodeIP.toLowerCase().includes(search.toLowerCase())
                  : node.NodeIP.includes(search) || node.fqdn !== ""
                  ? node.fqdn.toLowerCase().includes(search.toLowerCase())
                  : node.fqdn.includes(search)
              )
              .map((node, index) => (
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
                        textAlign="center"
                      />
                    </Td>

                    <Td className={classes.tableBody}>
                      {node.NodeQualifiedFullHostname}
                    </Td>

                    <Td className={classes.tableBody}>{node.fqdn}</Td>

                    <Td className={classes.tableBody}>{node.NodeIP}</Td>

                    <Td className={classes.tableBody}>
                      {node.HostingProvider}
                    </Td>

                    <Td className={classes.tableBody}>
                      <Button
                        className={classes.edtNode}
                        onClick={() =>
                          handleClickOpen(
                            node.NodeQualifiedFullHostname,
                            node.fqdn,
                            node.NodeIP,
                            node.HostingProvider
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
          {/* </TableContainer> */}
        </Grid></> : <h1 fullWidth style={{color: "white"}}>No Data</h1>}

        <Dialog
          open={menuOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => handleMenuClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className={classes.dialog}
          PaperProps={{
            style: {
              backgroundColor: "#2B2B2B",
              color: "#fff",
              boxShadow: "none",
              padding: "20px",
              minWidth: "280px",
            },
          }}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Please Select Hosting Provider"}
          </DialogTitle>
          <hr className={classes.hr}></hr>
          <Grid className={classes.formBody}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="prem"
                  control={<Radio className={classes.drawerCheckBox} />}
                  label="On-Prem"
                />
                <FormControlLabel
                  value="aws"
                  control={<Radio className={classes.drawerCheckBox} />}
                  label="AWS"
                />
                <FormControlLabel
                  value="azure"
                  control={<Radio className={classes.drawerCheckBox} />}
                  label="Azure"
                />
                <FormControlLabel
                  value="google"
                  control={<Radio className={classes.drawerCheckBox} />}
                  label="Google Cloud Platform"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid
            container
            direction="table"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={5}>
              <Button
                className={classes.dialogueCancel}
                onClick={handleMenuClose}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                className={classes.dialougeButton}
                onClick={handleMenuSubmit}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      </main>

      <div>
        {/* Drawer Component set to open on the right side*/}
        <Drawer
          anchor={"right"}
          open={drawer["right"]}
          onClose={() => toggleDrawer("right", false)}
          classes={{ paper: classes.MuiDrawer }}
        >
          {list("right")}
        </Drawer>
      </div>
    </div>
  );
};
