import React, { useState, useEffect } from 'react';
import { Button, Grid } from "@material-ui/core";
import useStyles from "./useStylesAlerts";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { API } from 'aws-amplify';
import config from "UserPoolAmplify";
import { Auth } from 'aws-amplify';
import Spinner from "components/User/Spinner";
import CrossSVG from './theExitIcon.svg';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Styles from "components/Alerts/AlertStyles.css";

export default () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const [info, setInfo] = useState([]);
    const [infoComp, ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, ] = useState(false);
    const [, setCompany] = useState();
    const [service, setService] = useState();
    const [toggleNew, setToggleNew] = useState(true);
    const [toggleCritical, setToggleCritical] = useState(false);
    const [toggleWarnings, setToggleWarnings] = useState(false)

    const [lastCheck, setLastCheck] = useState("No Data")
    const [checkIn, setCheckIn] = useState("No Data")
    const [checkAttempt, setCheckAttempt] = useState("No Data")
    const [executionTime, setExecutionTime] = useState("No Data")
    const [latency, setLatency] = useState("No Data")

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
    
            const graphData = await API.get(ApiData.name, `/users/cognito-retrieve`, options);
            setCompany(graphData.data.company_name)

            const radialData = await API.get(ApiData.name, `/monitoring/overview/alerts`, options);
            setInfo(radialData.data)
    
          } catch (err) {
            console.log(err);
          } finally{setLoading(false);}
        })();
    
      }, []);

      
    const toggleDrawer = (anchor, open, theLastCheck, nextCheckIn, checkAttempts, checkExecutionTime, checkLatency, service) => (event) => {
        setService(service)
        setLastCheck(theLastCheck)
        setCheckIn(nextCheckIn)
        setCheckAttempt(checkAttempts)
        setExecutionTime(checkExecutionTime)
        setLatency(checkLatency)
        setState({ ...state, [anchor]: open });
    };

    function dhm(t) {
        var utcSeconds = t;
        var d = new Date(0);
        d.setUTCSeconds(utcSeconds);
        var trimmedString = d.toString().substring(4, 25);
        return trimmedString;
    }

    function tryFunctionLastCheck() {
        if (lastCheck === "No Data") {
            return "No Data"
        }
        else {
            try {
                let t = lastCheck
                let date = dhm(t)
                return date;
            } catch (e) { return "No Data"; }
        }
    }

    function tryFunctionNextCheck() {
        if (checkIn === "No Data") {
            return "No Data"
        }
        else {
            try {
                let t = checkIn
                let date = dhm(t)
                return date;
            } catch (e) { return "No Data"; }
        }
    }

    function tryFunctionAttempt() {
        if (checkAttempt === "No Data") {
            return "No Data"
        }
        else {
            try {
                let t = checkAttempt
                return t;
            } catch (e) { return "No Data"; }
        }

    }

    function tryFunctionExecution() {
        if (executionTime === "No Data") {
            return "No Data"
        }
        else {
            try {
                let t = executionTime
                return t;
            } catch (e) { return "No Data"; }
        }

    }

    function tryFunctionLatency() {
        if (latency === "No Data") {
            return "No Data"
        }
        else {
            try {
                let t = latency
                return t;
            } catch (e) { return "No Data"; }
        }

    }

    function tryFunctionMaxAttempts() {
        try {
            let t = infoComp.host_max_check_attempts
            return t;
        } catch (e) { return "No Data"; }
    }

    function tryFunctionMemoryCritical() {
        try {

            if (service.includes("Disk") === true) {
                return "5% Left"
            }
            else if (service.includes("disk") === true) {
                return "5% Left"
            }
            else if (service.includes("Memory Usage" || "Memory") === true) {
                return "98%"
            }
            else if (service.includes("Swap Usage" || "Swap") === true) {
                return "2"
            }
            else if (service.includes("Load Average" || "Load") === true) {
                return "7.5, 6, 4,5"
            }
            else {
                return ""
            }
        } catch (e) { return null }
    }

    function tryFunctionMemoryWarning() {
        try {
            if (service.includes("Disk") === true) {
                return "10% Left"
            }
            else if (service.includes("disk") === true) {
                return "10% Left"
            }
            else if (service.includes("Memory Usage" || "Memory") === true) {
                return "90%"
            }
            else if (service.includes("Swap Usage" || "Swap") === true) {
                return "5"
            }
            else if (service.includes("Load Average" || "Load") === true) {
                return "5, 4, 3"
            }
            else {
                return ""
            }
        } catch (e) { return null }
    }

    function memType() {
        try {

            if (service.includes("Disk") === true) {
                return "Disk Warning:"
            }
            else if (service.includes("disk") === true) {
                return "Disk Warning:"
            }
            else if (service.includes("Memory Usage" || "Memory") === true) {
                return "Memory Warning:"
            }
            else if (service.includes("Swap Usage" || "Swap") === true) {
                return "Swap Usage Warning:"
            }
            else if (service.includes("Load Average" || "Load") === true) {
                return "Load Warning:"
            }
            else {
                return ""
            }
        } catch (e) { return null }
    }

    function critType() {
        try {

            if (service.includes("Disk") === true) {
                return "Disk Critical:"
            }
            else if (service.includes("disk") === true) {
                return "Disk Critical:"
            }
            else if (service.includes("Memory Usage" || "Memory") === true) {
                return "Memory Critical:"
            }
            else if (service.includes("Swap Usage" || "Swap") === true) {
                return "Swap Usage Critical:"
            }
            else if (service.includes("Load Average" || "Load") === true) {
                return "Load Critical:"
            }
            else {
                return ""
            }
        } catch (e) { return null }
    }

    const togglNewAlerts = () => {
        setToggleNew(true)
        setToggleCritical(false)
        setToggleWarnings(false)
    }

    const togglWarningAlerts = () => {
        setToggleNew(false)
        setToggleCritical(false)
        setToggleWarnings(true)
    }

    const togglCriticalAlerts = () => {
        setToggleNew(false)
        setToggleCritical(true)
        setToggleWarnings(false)
    }

    const resetFilter = () => {
        setToggleNew(true)
        setToggleCritical(false)
        setToggleWarnings(false)
    }

    function newAlerts() {
        return (
            <Tbody>
                {info.criticalAlerts.map(item => (
                    <Tr key={item.host_name} className={classes.data} onClick={toggleDrawer('right', true, item.last_check === null ? "No Data" : item.last_check, item.next_check === null ? "No Data" : item.next_check, item.max_check_attempts === null ? "No Data" : item.max_check_attempts, item.check_execution_time === null ? "No Data" : item.check_execution_time, item.check_latency === null ? "No Data" : item.check_latency, item.service_type === null ? "No Data" : item.service_type)} style={{ cursor: 'pointer' }}>
                        <Td className={classes.tableBody}
                            style={{ 'backgroundColor': item.alert_status === "2" ? '#FF5900' : item.alert_status === "1" ? '#FF9A00' : item.alert_status === "0" ? 'green' : '#6C275D' }}>
                        </Td>
                        <Td className={classes.tableBody} align="left">{item.host_name}</Td>
                        <Td className={classes.tableBody} align="left">{item.duration === null ? "No Data" : dhm(item.duration)}</Td>
                        <Td className={classes.tableBody} align="left">{item.company}</Td>
                        <Td className={classes.tableBody} align="left">{item.service_type}</Td>
                        <Td className={classes.tableBody} align="left">{item.server_message}</Td>
                    </Tr>
                ))}

                {info.warningAlerts.map(item => (

                    <Tr key={item.host_name} className={classes.data} onClick={toggleDrawer('right', true, item.last_check === null ? "No Data" : item.last_check, item.next_check === null ? "No Data" : item.next_check, item.max_check_attempts === null ? "No Data" : item.max_check_attempts, item.check_execution_time === null ? "No Data" : item.check_execution_time, item.check_latency === null ? "No Data" : item.check_latency, item.service_type === null ? "No Data" : item.service_type)} style={{ cursor: 'pointer' }}>
                        <Td className={classes.tableBody}
                            style={{ 'backgroundColor': item.alert_status === "2" ? '#FF5900' : item.alert_status === "1" ? '#FF9A00' : item.alert_status === "0" ? 'green' : '#6C275D' }}>
                        </Td>
                        <Td className={classes.tableBody} align="left">{item.host_name}</Td>
                        <Td className={classes.tableBody} align="left">{item.duration === null ? "No Data" : dhm(item.duration)}</Td>
                        <Td className={classes.tableBody} align="left">{item.company}</Td>
                        <Td className={classes.tableBody} align="left">{item.service_type}</Td>
                        <Td className={classes.tableBody} align="left">{item.server_message}</Td>
                    </Tr>
                ))}

                {info.okayAlerts.map(item => (
                    <Tr key={item.host_name} className={classes.data} onClick={toggleDrawer('right', true, item.last_check === null ? "No Data" : item.last_check, item.next_check === null ? "No Data" : item.next_check, item.max_check_attempts === null ? "No Data" : item.max_check_attempts, item.check_execution_time === null ? "No Data" : item.check_execution_time, item.check_latency === null ? "No Data" : item.check_latency, item.service_type === null ? "No Data" : item.service_type)} style={{ cursor: 'pointer' }}>
                        <Td className={classes.tableBody}
                            style={{ 'backgroundColor': item.alert_status === "2" ? '#FF5900' : item.alert_status === "1" ? '#FF9A00' : item.alert_status === "0" ? 'green' : '#6C275D' }}>
                        </Td>
                        <Td className={classes.tableBody} align="left">{item.host_name}</Td>
                        <Td className={classes.tableBody} align="left">{item.duration === null ? "No Data" : dhm(item.duration)}</Td>
                        <Td className={classes.tableBody} align="left">{item.company}</Td>
                        <Td className={classes.tableBody} align="left">{item.service_type}</Td>
                        <Td className={classes.tableBody} align="left">{item.server_message}</Td>
                    </Tr>
                ))}

                {info.unknownAlerts.map(item => (

                    <Tr key={item.host_name} className={classes.data} onClick={toggleDrawer('right', true, item.last_check === null ? "No Data" : item.last_check, item.next_check === null ? "No Data" : item.next_check, item.max_check_attempts === null ? "No Data" : item.max_check_attempts, item.check_execution_time === null ? "No Data" : item.check_execution_time, item.check_latency === null ? "No Data" : item.check_latency, item.service_type === null ? "No Data" : item.service_type)} style={{ cursor: 'pointer' }}>
                        <Td className={classes.tableBody}
                            style={{ 'backgroundColor': item.alert_status === "2" ? '#FF5900' : item.alert_status === "1" ? '#FF9A00' : item.alert_status === "0" ? 'green' : '#6C275D' }}>
                        </Td>
                        <Td className={classes.tableBody} align="left">{item.host_name}</Td>
                        <Td className={classes.tableBody} align="left">{item.duration === null ? "No Data" : dhm(item.duration)}</Td>
                        <Td className={classes.tableBody} align="left">{item.company}</Td>
                        <Td className={classes.tableBody} align="left">{item.service_type}</Td>
                        <Td className={classes.tableBody} align="left">{item.server_message}</Td>
                    </Tr>
                ))}
            </Tbody>)
    }

    function alertsCritical() {
        return (
            <Tbody>
                {info.criticalAlerts.map(item => (
                    <Tr key={item.host_name} className={classes.data} onClick={toggleDrawer('right', true, item.last_check === null ? "No Data" : item.last_check, item.next_check === null ? "No Data" : item.next_check, item.max_check_attempts === null ? "No Data" : item.max_check_attempts, item.check_execution_time === null ? "No Data" : item.check_execution_time, item.check_latency === null ? "No Data" : item.check_latency, item.service_type === null ? "No Data" : item.service_type)} style={{ cursor: 'pointer' }}>
                        <Td className={classes.tableBody}
                            style={{ 'backgroundColor': item.alert_status === "2" ? '#FF5900' : item.alert_status === "1" ? '#FF9A00' : item.alert_status === "0" ? 'green' : '#6C275D' }}>
                        </Td>
                        <Td className={classes.tableBody} align="left">{item.host_name}</Td>
                        <Td className={classes.tableBody} align="left">{item.duration === null ? "No Data" : dhm(item.duration)}</Td>
                        <Td className={classes.tableBody} align="left">{item.company}</Td>
                        <Td className={classes.tableBody} align="left">{item.service_type}</Td>
                        <Td className={classes.tableBody} align="left">{item.server_message}</Td>
                    </Tr>
                ))}
            </Tbody>
        )
    }

    function alertWarning() {
        return (
            <Tbody>
                {info.warningAlerts.map(item => (
                    <Tr key={item.host_name} className={classes.data} onClick={toggleDrawer('right', true, item.last_check === null ? "No Data" : item.last_check, item.next_check === null ? "No Data" : item.next_check, item.max_check_attempts === null ? "No Data" : item.max_check_attempts, item.check_execution_time === null ? "No Data" : item.check_execution_time, item.check_latency === null ? "No Data" : item.check_latency, item.service_type === null ? "No Data" : item.service_type)} style={{ cursor: 'pointer' }}>

                        <Td className={classes.tableBody}
                            style={{ 'backgroundColor': item.alert_status === "2" ? '#FF5900' : item.alert_status === "1" ? '#FF9A00' : item.alert_status === "0" ? 'green' : '#6C275D' }}>
                        </Td>
                        <Td className={classes.tableBody} align="left">{item.host_name}</Td>
                        <Td className={classes.tableBody} align="left">{item.duration === null ? "No Data" : dhm(item.duration)}</Td>
                        <Td className={classes.tableBody} align="left">{item.company}</Td>
                        <Td className={classes.tableBody} align="left">{item.service_type}</Td>
                        <Td className={classes.tableBody} align="left">{item.server_message}</Td>
                    </Tr>
                ))}

            </Tbody>
        )
    }

    const list = (anchor) => (
        loading2 ? <Spinner /> :
            <div className={classes.list}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <List>
                    <ListItem >
                        <ListItemText align="left"><h1>Alert Details</h1></ListItemText>
                        <ListItemText align="right"> <img onClick={()=>toggleDrawer()} className={classes.exitsvg} alt="Exit" src={CrossSVG}/></ListItemText>
                    </ListItem>

                    <ListItem >
                        <ListItemText align="left">Last Check:</ListItemText>
                        <ListItemText align="left">{tryFunctionLastCheck()}</ListItemText>
                    </ListItem>

                    <ListItem >
                        <ListItemText align="left">Next Check-In:</ListItemText>
                        <ListItemText align="left">{tryFunctionNextCheck()}</ListItemText>
                    </ListItem>

                    <ListItem >
                        <ListItemText align="left">Check Attempts:</ListItemText>
                        <ListItemText align="left">{tryFunctionAttempt()}</ListItemText>
                    </ListItem>

                    <ListItem >
                        <ListItemText align="left">Check Execution Time:</ListItemText>
                        <ListItemText align="left">{tryFunctionExecution()}</ListItemText>
                    </ListItem>

                    <ListItem >
                        <ListItemText align="left">Check Latency:</ListItemText>
                        <ListItemText align="left">{tryFunctionLatency()}</ListItemText>
                    </ListItem>

                    <ListItem >
                        <ListItemText align="left">Check Interval:</ListItemText>
                        <ListItemText align="left">120</ListItemText>
                    </ListItem>

                    <ListItem >
                        <ListItemText align="left">Max Check Attempts:</ListItemText>
                        <ListItemText align="left">3</ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText align="left">{critType()}</ListItemText>
                        <ListItemText align="left"> {tryFunctionMemoryCritical()}</ListItemText>
                    </ListItem >

                    <ListItem>
                        <ListItemText align="left">{memType()}</ListItemText>
                        <ListItemText align="left">{tryFunctionMemoryWarning()}</ListItemText>
                    </ListItem >
                </List>
            </div >
    );

    return (
        loading ? <Spinner /> :
            info.length !== 0 ? 
            <>
                <Grid container className={classes.layout} item xs={12} direction="column">
                   {info.allData < 1 ? null : 
                   <Grid item xs>
                        <Button className={classes.buttonToggle} style={{ 'color': toggleNew === true ? 'white' : '#A4A4A4' }} onClick={togglNewAlerts}>New Alerts</Button>
                        <Button className={classes.buttonToggle} style={{ 'color': toggleCritical === true ? 'white' : '#A4A4A4' }} onClick={togglCriticalAlerts}>Critical Alerts</Button>
                        <Button className={classes.buttonToggle} style={{ 'color': toggleWarnings === true ? 'white' : '#A4A4A4' }} onClick={togglWarningAlerts}>Warning Alerts</Button>
                        <Button className={classes.resetFilterBtn} onClick={resetFilter}>RESET FILTERS </Button>

                        <Table className={Styles} className={classes.table} aria-label="customized table">
                            <Thead className={classes.tableHead}>
                                <Tr>
                                    <Th className={classes.theHead}>Alert</Th>
                                    <Th className={classes.theHead} align="center">Error Type</Th>
                                    <Th className={classes.theHead} align="center">Time</Th>
                                    <Th className={classes.theHead} align="center">Company</Th>
                                    <Th className={classes.theHead} align="center">Type of Service</Th>
                                    <Th className={classes.theHead} align="center">Alert Detail</Th>
                                </Tr>
                            </Thead>
                            {toggleNew === true ? newAlerts() : null}
                            {toggleCritical === true ? alertsCritical() : null}
                            {toggleWarnings === true ? alertWarning() : null}
                        </Table>

                        <div className={classes.list} >
                            {/* Drawer Component set to open on the right side*/}
                            <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)} classes={{ paper: classes.MuiDrawer }}>
                                {list('right')}
                            </Drawer>
                        </div>
                    </Grid>}
                </Grid> 

                <Grid container item xs={12} direction="column">
                    {toggleNew === true ? info.allData < 1 ? 
                        <Grid item xs style={{display: "flex", justifyContent: "flex-start"}}>
                            <h1 className={classes.noData}>No Alert Data</h1>
                        </Grid> : null : null
                    }
                </Grid>

                <Grid container item xs={12} direction="column">
                    {toggleCritical === true ? info.criticalAlerts < 1 ? 
                        <Grid item xs style={{display: "flex", justifyContent: "flex-start"}}>
                            <h1 className={classes.noData}>No Alert Data</h1>
                        </Grid> : null : null
                    }
                </Grid>

                <Grid container item xs={12} direction="column">
                    {toggleWarnings === true ? info.warningAlerts < 1 ? 
                        <Grid item xs style={{display: "flex", justifyContent: "flex-start"}}>
                            <h1 className={classes.noData}>No Alert Data</h1>
                        </Grid> : null : null
                    }
                </Grid>
            </> : <h1 className={classes.noData}>No Data</h1>
    );
};
