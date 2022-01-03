import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./useStylesNodeMan";
import Spinner from "components/User/Spinner";
import { API } from 'aws-amplify';
import config from "UserPoolAmplify";
import { Auth } from 'aws-amplify';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { TextField, Button, Paper, Grid } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { Context } from "components/NodeManagement/store";
import { useLocation } from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#9A2849'
        }
    }
})

function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <MuiThemeProvider theme={theme}>
                    <LinearProgress variant="determinate" color="secondary" {...props} />
                </MuiThemeProvider>
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="white">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const WhiteRadio = withStyles({
    root: {
        color: "white",
        '&$checked': {
            color: "white",
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

export default () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [, setCompany] = useState();
    const history = useHistory();
    const [progress] = React.useState(40);
    const [, setValue] = React.useState();
    const [os, setOs] = useState();
    const location = useLocation();
    const [theHeading, setTheHeading] = useState("");

    useEffect(() => {
    }, [location]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const ApiData = config.APIDetails.endpoints[0]

                Auth.currentAuthenticatedUser().then((user) => {
                    let jwtToken = user.signInUserSession.idToken.jwtToken;
                    const options = {
                        response: true,
                        headers: {
                            Authorization: jwtToken
                        }
                    }
                    setLoading(false);
                    API.get(ApiData.name, `/users/cognito-retrieve`, options).then(res => {
                        setCompany(res.data.company_name)
                    }).catch(error => {
                        setLoading(false)
                        console.log(error.response)
                    })
                });
            } catch (err) {
                console.log(err);
            } setLoading(false)
        })();
    }, []);

    const onSubmit = event => { };

    const handleChange = (event) => {
        setValue(event.target.value);
        Context._currentValue.OperatingSystem = event.target.value
        if (event.target.value === "awslinux") {
            setOs("/linuxdata")
            setTheHeading("Linux/Unix Details")
        }
        else if (event.target.value === "unix") {
            setOs("/linuxdata")
            setTheHeading("Linux/Unix Details")
        }
        else if (event.target.value === "ubuntu") {
            setOs("/linuxdata")
            setTheHeading("Linux/Unix Details")
        }
        else if (event.target.value === "redhat") {
            setOs("/linuxdata")
            setTheHeading("Linux/Unix Details")
        }
        else if (event.target.value === "suse") {
            setOs("/linuxdata")
            setTheHeading("Linux/Unix Details")
        }
        else if (event.target.value === "aix") {
            setOs("/linuxdata")
            setTheHeading("Linux/Unix Details")
        }
        else if (event.target.value === "windows") {
            setOs("/windowsdata")
            setTheHeading("Windows Details")
        }
        else {
            if (location.number === 1) {
                setOs("/finishednodeadd")
                submit()
            }
            else if (location.number === 2) {
                setTheHeading("Operating System")
                setOs("/customOS")
            }
            else if (location.number === 3) {
                setTheHeading("Azure")
                setOs("/customAzure")
            }
            else if (location.number === 5) {
                setTheHeading("Operating System")
                setOs("/customOS")
            }
        }
    };

    function submit() {
        (async () => {
            try {
                setLoading(true);
                const ApiData = config.APIDetails.endpoints[0]
                Auth.currentAuthenticatedUser().then((user) => {
                    let jwtToken = user.signInUserSession.idToken.jwtToken;
                    const options = {
                        response: true,
                        headers: {
                            Authorization: jwtToken
                        },
                        body: {
                            HostingProvider: Context._currentValue.HostingProvider,
                            NodeIP: Context._currentValue.NodeIP,
                            OperatingSystem: Context._currentValue.OperatingSystem,
                            NodeQualifiedFullHostname: Context._currentValue.NodeQualifiedFullHostname,
                            OperatingSystemVersion: Context._currentValue.OperatingSystemVersion,
                            SSHUsername: Context._currentValue.SSHUsername,
                            SSHPassword: Context._currentValue.SSHPassword,
                            PublicKey: Context._currentValue.PublicKey,
                            SudoPassword: Context._currentValue.SudoPassword,
                            SudoOptions: Context._currentValue.SudoOptions,
                            RootPassword: Context._currentValue.RootPassword,
                            TCPPort443Opened: Context._currentValue.TCPPort443,
                            TCPPort22Opened: Context._currentValue.TCPPort22,
                            TCPPort5985Opened: Context._currentValue.TCPPort5985,
                            TCPPort5986Opened: Context._currentValue.TCPPort5986,
                            WinRMUsername: Context._currentValue.WinRMUsername,
                            WinRMPassword: Context._currentValue.WinRMPassword,
                            AWSServiceType: Context._currentValue.AWSServiceType,
                            AWSAccessKeyID: Context._currentValue.AWSAccessKeyID,
                            AWSSecretAccessKey: Context._currentValue.AWSSecretAccessKey,
                            AzureClientSecret: Context._currentValue.AzureClientSecret,
                            AzureTenantID: Context._currentValue.AzureTenantID,
                            GCPServiceAccountJSONCredentials: Context._currentValue.GCPServiceAccountJSONCredentials
                        }
                    }
                    setLoading(false);

                    API.post(ApiData.name, `/node-config/upload?action=create`, options).then(res => {
                    }).catch(error => {
                        setLoading(false)
                        console.log(error.response)
                    })
                });

            } catch (err) {
                console.log(err);
            } setLoading(false)
        })();
    }

    return (
        loading ? <Spinner /> :
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <h3 align="center">Add A Node</h3>
                    <LinearProgressWithLabel value={progress} />
                </Paper>
                
                <Paper className={classes.paper}>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={12}>
                            <h2 align="center">{location.heading}</h2>
                            <hr></hr>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={12}
                        >
                            <form onSubmit={onSubmit}>
                                <h3>Node Details</h3>
                                <Grid align="center">
                                    <TextField fullWidth required type="text" className={classes.textField} variant="filled" size="small" label="IP Address" onChange={event => Context._currentValue.NodeIP = event.target.value} />
                                    <TextField fullWidth required type="text" className={classes.textField} variant="filled" size="small" label="Qualified Full Hostname" onChange={event => Context._currentValue.NodeQualifiedFullHostname = event.target.value} />
                                </Grid>
                                <h3>Operating System</h3>
                                {/* <div className={classes.radioColumns}> */}
                                <FormControl required component="fieldset" >
                                    <RadioGroup aria-label="OS" name="OS" onChange={handleChange} className={classes.radioColumns}>
                                        <div>
                                            <FormControlLabel value="redhat" control={<WhiteRadio />} label="RedHat" />
                                        </div>
                                        <div>
                                            <FormControlLabel value="suse" control={<WhiteRadio />} label="SUSE" />
                                        </div>
                                            <FormControlLabel value="ubuntu" control={<WhiteRadio />} label="Ubuntu" />
                                        <div>
                                            <FormControlLabel value="awslinux" control={<WhiteRadio />} label="AWS Linux" />
                                        </div>
                                        <div>
                                            <FormControlLabel value="windows" control={<WhiteRadio />} label="Microsoft Windows Server" />
                                        </div>
                                        <div>
                                            <FormControlLabel value="aix" control={<WhiteRadio />} label="AIX" />
                                        </div>
                                        <div>
                                            <FormControlLabel value="unix" control={<WhiteRadio />} label="Unix" />
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                {/* </div> */}

                                <h3>Other</h3>
                                <Grid align="center">
                                    <TextField fullWidth type="text" className={classes.textField} variant="filled" size="small" label="Operating System" onChange={event => Context._currentValue.OperatingSystem = event.target.value} />
                                    <TextField fullWidth type="text" className={classes.textField} variant="filled" size="small" label="Version" onChange={event => Context._currentValue.OperatingSystemVersion = event.target.value} />
                                </Grid>

                                <Button fullWidth variant="contained" className={classes.button} type="submit" onClick={() => {
                                    history.push({
                                        pathname: os,
                                        heading: theHeading,
                                        security: location.security
                                    })
                                }}>NEXT</Button>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>

            </main >
    );
};
