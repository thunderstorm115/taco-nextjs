import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./useStylesNodeMan";
import Spinner from "components/User/Spinner";
import { API } from 'aws-amplify';
import config from "UserPoolAmplify";
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import { Paper, Grid } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
    const [, setCompany] = useState();
    const history = useHistory();
    const [progress] = React.useState(100);
    const location = useLocation();

    
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

    return (
        loading ? <Spinner /> :
            <main className={classes.layout}>

                <Paper className={classes.paper}>
                    <h3 align="center">{location.heading}</h3>
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
                            <h3 align="center">Your node setup is in progress. You will be notified once your node configuration is complete.</h3>

                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={12}>
                            <Button className={classes.yesButton} onClick={() => { 
                                        history.push({
                                            pathname: "/nodeManagement",
                                            
                                        })
                                    }}>HOME</Button>
                        </Grid>
                    </Grid>
                </Paper>

            </main>
    );
};
