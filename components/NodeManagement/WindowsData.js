import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AccountContext } from "components/LoginPage/Accounts";
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
    const { getSession } = useContext(AccountContext);
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState();
    const history = useHistory();
    const [progress, setProgress] = React.useState(60);
    const [value, setValue] = React.useState();
    const { state, actions } = React.useContext(Context);
    const location = useLocation();

    window.onbeforeunload = function() {
        return "you can not refresh the page";
    }
    



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
                        console.log(res)
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


    const onSubmit = event => {

    };

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

                                    <TextField  fullWidth type="text" className={classes.textField} variant="filled" size="small" label="WinRM Username" onChange={event => Context._currentValue.WinRMUsername = event.target.value} />

                                    {location.security === "yes" ? <TextField  fullWidth type="password" className={classes.textField} variant="filled" size="small" label="WinRM Password" onChange={event => Context._currentValue.WinRMPassword = event.target.value} /> : null}

                                    <Button fullWidth variant="contained" className={classes.button} type="submit" onClick={() => {
                                        history.push({
                                            pathname: "/windowsports",
                                            heading: "Windows Ports",
                                            security: location.security
                                        })
                                    }}>NEXT</Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

            </main >
    );
};
