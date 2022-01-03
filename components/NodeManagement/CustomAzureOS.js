import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./AddNode/useStylesNodeMan";
import Spinner from "components/User/Spinner";
import { API } from 'aws-amplify';
import config from "UserPoolAmplify";
import { Auth } from 'aws-amplify';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { TextField, Button, Paper, Grid } from "@material-ui/core";
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

export default () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [ ,setCompany] = useState();
    const history = useHistory();
    const [progress] = React.useState(75);
    const location = useLocation();

    window.onbeforeunload = function() {
        return "you can not refresh the page";
    }
    
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
    const onSubmit = event => {}
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
                        body:{
                            
                            HostingProvider: Context._currentValue.HostingProvider,
                            NodeIP:Context._currentValue.NodeIP,
                            OperatingSystem: Context._currentValue.OperatingSystem,
                            NodeQualifiedFullHostname: Context._currentValue.NodeQualifiedFullHostname,
                            OperatingSystemVersion: Context._currentValue.OperatingSystemVersion,
                            SSHUsername: Context._currentValue.SSHUsername,
                            SSHPassword:Context._currentValue.SSHPassword,
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
                            GCPServiceAccountJSONCredentials:  Context._currentValue.GCPServiceAccountJSONCredentials
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

        history.push("/finishednodeadd")
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
                            <h2 align="center">Azure | OS</h2>
                            <hr></hr>
                            <br></br>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                         <Grid item xs={12}>
                            <Grid item xs={12} align="center">
                                <form onSubmit={onSubmit}>
                                <h3>Service Type</h3>
    
                                    <TextField  fullWidth type="password" className={classes.textField} variant="filled" size="small" label="Tennant ID" onChange={event => Context._currentValue.AzureClientSecret = event.target.value} />

                                    {location.security === "yes" ? <TextField  fullWidth type="password" className={classes.textField} variant="filled" size="small" label="Client Secret" onChange={event => Context._currentValue.AzureTenantID = event.target.value} /> : null }

                                    <Button fullWidth variant="contained" className={classes.button} type="submit" onClick={submit}>NEXT</Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

            </main >
    );
};
