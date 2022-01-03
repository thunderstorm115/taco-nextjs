import React, { useState, useEffect } from "react";
import useStyles from "./PendingStyles";
import { useHistory } from "react-router-dom";
import Spinner from "components/User/Spinner";
import { API } from "aws-amplify";
import config from "UserPoolAmplify";
import { Auth } from "aws-amplify";
import { Button, Grid } from "@material-ui/core";
import { Checkbox, TextField } from "@material-ui/core";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Styles from "components/PendingChanges/PendingTableStyles.css";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [nodeSearch, setNodeSearch] = useState("");
  const [admin, setAdmin] = useState("");
  const [nodes, setNodes] = useState([]);
  const [compliance, setCompliance] = useState([]);
  const [host, setHost] = useState([]);
  const [activeNodes, setActiveNodes] = useState([]);
  const [monitoringSearch, setMonitoringSearch] = useState("");
  const [benchmarkSearch, setBenchmarkSearch] = useState("");
  const [services, setServices] = useState([]);
  const [activeServices, setActiveServices] = useState([]);
  const [benchmarkselected, setBenchmarkSelected] = useState(false);

  const [nodesCheck, setNodesCheck] = useState(true);
  const [servicesCheck, setServicesCheck] = useState(false);
  const [benchmarksCheck, setBenchmarksCheck] = useState(false);

  const [pendingChangesCheck, setPendingChangesCheck] = useState(false);

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
        await getNodeData(options);
        await API.get(ApiData.name, `/users/cognito-retrieve`, options).then(res => {
          setAdmin(res.data.profile)
        }).catch(error => {
          console.log(error.response)
        })
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getNodeData = async (options) => {
    const ApiData = config.APIDetails.endpoints[0];
    setLoading(true);
    setPendingChangesCheck(false);
    try {
      await API.get(ApiData.name, "/node-management/pending-changes", options).then((res) => {
        if (!res.data[0].length ) {
          setNodesCheck(true);
        } else {
          setNodes(res.data[0]);
          setNodesCheck(false);
        }
        if (!res.data[1].length) {
          setServicesCheck(true);
        } else {
          setServices(res.data[1]);
          setServicesCheck(false);
        } 
        if (Object.keys(res.data[2]).length === 0) {
          setBenchmarksCheck(true);
        } else {
          setBenchmarksCheck(false);
          setCompliance(res.data[2]);
        }
      });  

    } catch (e) {
      console.error(e);
      setPendingChangesCheck(true);
    } finally {
      setLoading(false);
    };
  }

  function handleCheckedOnChange(selectedNode, action) {
    if (action === "add") {
      let nodesAfterSlice = nodes;
      nodes.map((node, index) => {
        if (
          node.name === selectedNode.name
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
          node.name === selectedNode.name
        ) {
          nodesAfterSlice.splice(index, 1);
          setActiveNodes(nodesAfterSlice);
          setNodes([selectedNode, ...nodes]);
        }
      });
    }
  }

  function selectAllNodes() {
    if (nodes.length) {
      setActiveNodes([...activeNodes, ...nodes]);
      setNodes([]);
      setHost([...host, ...nodes]);
    }
  }

  function deSelectAllNodes() {
    if (activeNodes.length) {
      setActiveNodes([]);
      setNodes([...nodes, ...activeNodes]);
      setHost([]);
    }
  }

  const completeNodes = async () => {
    setLoading(true);
    try {
      await Auth.currentAuthenticatedUser().then((user) => { 
        let jwtToken = user.signInUserSession.idToken.jwtToken;
        const options = {
          response: true,
          headers: {
            Authorization: jwtToken
          },
          body: {
            activeHostname: activeNodes,
            completedtype: "nodes",
          }
        }
        const ApiData = config.APIDetails.endpoints[0]
        API.post(ApiData.name, `/node-management/upload-pending-changes`, options);

      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      history.push("/finishedComplete");
    };
  }
  
  function handleCheckedServices(selectedService, action) {
    if (action === "add") {
      let servicesAfterSlice = services;
      services.map((service, index) => {
        if (
          service.name === selectedService.name
        ) {
          servicesAfterSlice.splice(index, 1);
          setServices(servicesAfterSlice);
          setActiveServices([...activeServices, selectedService]);
        }
      });
    } else {
      let servicesAfterSlice = activeServices;
      activeServices.map((service, index) => {
        if (
          service.name === selectedService.name
        ) {
          servicesAfterSlice.splice(index, 1);
          setActiveServices(servicesAfterSlice);
          setServices([selectedService, ...services]);
        }
      });
    }
  }

  function selectAllServices() {
    if (services.length) {
      setActiveServices([...activeServices, ...services]);
      setServices([]);
      setHost([...host, ...services]);
    }
  }

  function deSelectAllServices() {
    if (activeServices.length) {
      setActiveServices([]);
      setServices([...services, ...activeServices]);
      setHost([]);
    }
  }

  const completeServices = async () => {
    setLoading(true);
    try {
      await Auth.currentAuthenticatedUser().then((user) => {
        let jwtToken = user.signInUserSession.idToken.jwtToken;
        const options = {
          response: true,
          headers: {
            Authorization: jwtToken
          },
          body: {
            activeHostname: activeServices,
            completedtype: "services",
          }
        }

        const ApiData = config.APIDetails.endpoints[0];
        API.post(ApiData.name, `/node-management/upload-pending-changes`, options);

        setLoading(false);

        API.post(ApiData.name, `/node-management/upload-pending-changes`, options)
          .then(res => {


          }).catch(error => {
            setLoading(false)
            console.log(error.response)
          })

      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      history.push("/finishedComplete");
    };
  }

  const completeBenchmarks = async () => {
    try {
      setLoading(true);
      await Auth.currentAuthenticatedUser().then((user) => {
        let jwtToken = user.signInUserSession.idToken.jwtToken;
        const options = {
          response: true,
          headers: {
            Authorization: jwtToken
          },
          body: {
            completedtype: "compliance",
          }
        }
        const ApiData = config.APIDetails.endpoints[0];
        API.post(ApiData.name, `/node-management/upload-pending-changes`, options);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      history.push("/finishedComplete");
    };
  }

  console.log(benchmarksCheck)
  return loading ? (
    <Spinner />
  ) : (
      <div className={classes.nodeGrid}>
        {pendingChangesCheck === false ? (
        <main>
          {/* Nodes table */}
          <div>
            <h1 className={classes.TitleLabel}>Nodes</h1>
            <Grid container>
              <Grid item xs={12} md={4} lg={4}>
                <TextField
                  className={classes.textField}
                  type="search"
                  value={nodeSearch}
                  onChange={(event) => setNodeSearch(event.target.value)}
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

              {admin === "GlobalAdmin" ?
                <Grid item xs={12} md={8} lg={8}>
                 {!nodesCheck ? 
                 <Button className={classes.completeBtn} onClick={() => completeNodes()} disabled={activeNodes.length < 1}>
                    COMPLETE
                  </Button> : null}

                  {!nodesCheck ?  
                  <Button className={classes.deselectBtn} onClick={deSelectAllNodes} disabled={false}>
                    DESELECT ALL
                  </Button>: null}

                  {!nodesCheck ?
                  <Button className={classes.selectAllBtn} onClick={selectAllNodes} disabled={nodes.length < 1}>
                    SELECT ALL
                  </Button>: null}
                </Grid>
              : null}
            </Grid>

            {!nodesCheck ? (
            <div>
              {activeNodes.length ? (
                <Grid>
                  <h2 className={classes.label}>Selected</h2>
                  <Table className={classes.table}>
                    <Thead className={classes.tableHead}>
                      <Tr>
                        {admin === "GlobalAdmin" ?
                          <Th>Select</Th>
                        : null}

                        <Th>Node Name</Th>
                        <Th>FQDN</Th>
                        <Th>IP Address</Th>
                        <Th>Platform</Th>
                      </Tr>
                    </Thead>
                    {activeNodes.map((node, index) => (
                      <Tbody className={classes.tableBody}>
                        <Tr>
                          {admin === "GlobalAdmin" ?
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
                            : null}

                          <Td className={classes.tableBody}>

                            {node.name}

                          </Td>

                          <Td className={classes.tableBody}>
                            {node.fqdn}
                          </Td>

                          <Td className={classes.tableBody}>
                            {node.ipaddress}
                          </Td>

                          <Td className={classes.tableBody}>
                            {node.platform_family}

                          </Td>
                        </Tr>
                      </Tbody>
                    ))}
                  </Table>
                </Grid>
              ) : null}

              {nodes.length ?
                (<Grid className={classes.table}>
                  <h2 className={classes.label}>Unselected</h2>
                  <Table className={Styles} className={classes.table}>
                    <Thead className={classes.tableHead}>
                      <Tr>
                        {admin === "GlobalAdmin" ?
                          <Th>Select</Th>
                          : null}
                        <Th>Node Name</Th>
                        <Th>FQDN</Th>
                        <Th>IP Address</Th>
                        <Th>Platform</Th>
                      </Tr>
                    </Thead>
                    {nodes
                      .filter((node) =>
                       node.name !== "" ? node.name.toLowerCase().includes(nodeSearch.toLowerCase())
                       : node.name.includes(nodeSearch) ||
                       node.ipaddress !== "" ? node.ipaddress.toLowerCase().includes(nodeSearch.toLowerCase())
                       : node.ipaddress.includes(nodeSearch) ||
                       node.fqdn !== "" ? node.fqdn.toLowerCase().includes(nodeSearch.toLowerCase())
                       : node.fqdn.includes(nodeSearch) ||
                       node.platform_family !== "" ? node.platform_family.toLowerCase().includes(nodeSearch.toLowerCase())
                       : node.platform_family.includes(nodeSearch)
                       )
                      .map((node, index) => (
                        <Tbody className={classes.tableBody}>
                          <Tr>
                            {admin === "GlobalAdmin" ?
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
                              : null}

                            <Td className={classes.tableBody}>
                              {node.name}
                            </Td>

                            <Td className={classes.tableBody}>
                              {node.fqdn}
                            </Td>

                            <Td className={classes.tableBody}>
                              {node.ipaddress}
                            </Td>

                            <Td className={classes.tableBody}>
                              {node.platform_family}
                            </Td>
                          </Tr>
                        </Tbody>
                      ))}
                  </Table>
                </Grid>
                ) : null}
            </div>) : <h2 className={classes.checkBox}>No Data</h2>}
          </div>

          {/* Monitoring Services table */}
          <div style={{ marginTop: "20px" }}>
            <h1 className={classes.TitleLabel}>Monitoring Services</h1>
            <Grid container>
              <Grid item xs={12} md={4} lg={4}>
                <TextField
                  className={classes.textField}
                  type="search"
                  value={monitoringSearch}
                  onChange={(event) => setMonitoringSearch(event.target.value)}
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

              {admin === "GlobalAdmin" ?
                <Grid item xs={12} md={8} lg={8}>
                  {!servicesCheck ?
                  <Button className={classes.completeBtn} onClick={() => completeServices()} disabled={activeServices.length < 1}>
                    COMPLETE
                  </Button>:null}

                  {!servicesCheck ?
                  <Button className={classes.deselectBtn} onClick={deSelectAllServices} disabled={false}>
                    DESELECT ALL
                  </Button>:null}

                  {!servicesCheck ?
                  <Button className={classes.selectAllBtn} onClick={selectAllServices} disabled={services.length < 1}>
                    SELECT ALL
                  </Button>:null}
                </Grid>
              : null}
            </Grid>

            {!servicesCheck ?

              (<div>
                {activeServices.length ? (
                  <Grid>
                    <h2 className={classes.label}>Selected</h2>
                    <Table className={classes.table}>
                      <Thead className={classes.tableHead}>
                        <Tr>
                          {admin === "GlobalAdmin" ?
                            <Th>Select</Th>
                            : null}
                          <Th>Node Name</Th>
                          <Th>FQDN</Th>
                          <Th>IP Address</Th>
                          <Th>Platform</Th>
                          <Th>List of Services</Th>
                        </Tr>
                      </Thead>
                      {activeServices.map((service, index) => (
                        <Tbody className={classes.tableBody}>
                          <Tr>
                            {admin === "GlobalAdmin" ?
                              <Td className={classes.tableBody}>
                                <Checkbox
                                  inputProps={{ "aria-label": "primary checkbox" }}
                                  className={classes.checkBox}
                                  onChange={() => {
                                    handleCheckedServices(service, "remove");
                                  }}
                                  checked={true}
                                />
                              </Td>
                              : null}

                            <Td className={classes.tableBody}>
                              {service.name}
                            </Td>

                            <Td className={classes.tableBody}>
                              {service.fqdn}
                            </Td>

                            <Td className={classes.tableBody}>
                              {service.ipaddress}
                            </Td>

                            <Td className={classes.tableBody}>
                              {service.platform_family}
                            </Td>

                            <Td className={classes.tableBody}>
                              {service.service_type} :
                              {service.service_data}
                            </Td>
                          </Tr>
                        </Tbody>
                      ))}
                    </Table>
                  </Grid>
                ) : null}

                {services.length ? ( 
                  <Grid className={classes.table}>
                    <h2 className={classes.label}>Unselected</h2>
                    <Table className={Styles} className={classes.table}>
                      <Thead className={classes.tableHead}>
                        <Tr>
                          <Th>Select</Th>
                          <Th>Node Name</Th>
                          <Th>FQDN</Th>
                          <Th>IP Address</Th>
                          <Th>Platform</Th>
                          <Th>List of Services</Th>
                        </Tr>
                      </Thead>
                      {services
                        .filter((service) =>
                          service.name !== ""
                            ? service.name.toLowerCase().includes(
                              monitoringSearch.toLowerCase()
                            )
                            : service.name.includes(monitoringSearch) ||
                              service.ipaddress !== ""
                              ? service.ipaddress.toLowerCase().includes(monitoringSearch.toLowerCase())
                              : service.ipaddress.includes(monitoringSearch) || service.fqdn !== ""
                                ? service.fqdn.toLowerCase().includes(monitoringSearch.toLowerCase())
                                : service.fqdn.includes(monitoringSearch)
                        )
                        .map((service, index) => (
                          <Tbody className={classes.tableBody}>
                            <Tr>
                              <Td className={classes.tableBody}>
                                <Checkbox
                                  inputProps={{ "aria-label": "primary checkbox" }}
                                  className={classes.checkBox}
                                  onChange={() => {
                                    handleCheckedServices(service, "add");
                                  }}
                                  checked={false}
                                  textAlign="center"
                                />
                              </Td>

                              <Td className={classes.tableBody}>
                              {service.name}
                            </Td>

                            <Td className={classes.tableBody}>
                              {service.fqdn}
                            </Td>

                            <Td className={classes.tableBody}>
                              {service.ipaddress}
                            </Td>

                            <Td className={classes.tableBody}>
                              {service.platform_family}
                            </Td>

                            <Td className={classes.tableBody}>
                              {service.service_type} :
                              {service.service_data}
                            </Td>
                            </Tr>
                          </Tbody>
                        ))}
                    </Table>
                  </Grid>
                ) : null}
              </div>) : <h2 className={classes.checkBox}>No Data</h2>}
          </div>

          {/* Compliance Benchmarks table */}
          <div style={{ marginTop: "20px" }}>
            <h1 className={classes.TitleLabel}>Compliance Benchmarks</h1>
            <Grid container>
              <Grid item xs={12} md={4} lg={4}>
                <TextField
                  className={classes.textField}
                  type="search"
                  value={benchmarkSearch}
                  onChange={(event) => setBenchmarkSearch(event.target.value)}
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

              <Grid item xs={12} md={8} lg={8}>
              {!benchmarksCheck ? 
                <Button className={classes.completeBtn} onClick={() => completeBenchmarks()} disabled={!benchmarkselected}>
                  COMPLETE
                </Button> : null}
              </Grid>
            </Grid>

            <div>
              {!benchmarksCheck? (
                <Grid>
                  <h2> </h2>
                  <Table className={classes.table}>
                    <Thead className={classes.tableHead}>
                      <Tr>
                        <Th>Select</Th>
                        <Th>Out Of Box Benchmarks</Th>
                        <Th className={classes.configBench}>Configuration Benchmarks</Th>
                      </Tr>
                    </Thead>
                    <Tbody className={classes.tableBody}>
                      <Tr>
                        <Td className={classes.tableBody}>
                          <Checkbox
                            inputProps={{ "aria-label": "primary checkbox" }}
                            className={classes.checkBox}
                            onChange={() => {
                              setBenchmarkSelected(!benchmarkselected);
                            }}
                          />
                        </Td>

                        <Td className={classes.tableBody}>
                          <p>CIS - {compliance.cis ? "True" : "False"}</p>
                          <p>Obsidian Best Practices - {compliance.obsprac ? "True" : "False"}</p>
                          <p>Operating System Updates and Patching - {compliance.opsupdatepatch ? "True" : "False"}</p>
                        </Td>

                        <Td className={classes.tableBody}>
                          <p>POPI - {compliance.popi ? "True" : "False"}</p>
                          <p>GDPR - {compliance.gdpr ? "True" : "False"}</p>
                          <p>PCI DSS - {compliance.pcidss ? "True" : "False"}</p>
                          <p>SOX - {compliance.sox ? "True" : "False"}</p>
                          <p>NIST - {compliance.nist ? "True" : "False"}</p>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Grid>
              ) : <h2 className={classes.checkBox}>No Data</h2>}
              </div>
          </div>
        </main>
        ) : <h2 className={classes.checkBox}>Internal Server Error</h2>}

      </div >
    );
};
