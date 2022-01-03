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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Context } from "../store";
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
    const [progress] = React.useState(20);
    const [nodeType, setNodeType] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [nextPage, setNextPage] = useState("/OnPremNode");
    const [theHeading, setTheHeading] = useState("");
    const [num, setNum] = useState("");
    const location = useLocation();

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

    const onSubmit = event => {};

    const handleChange = (event) => {
        setNodeType(event.target.value);
        if(event.target.value === 1){
            setNextPage("/onpremnodedetails")
            setTheHeading("On-Prem | OS")
            setNum(1)
            Context._currentValue.HostingProvider = "On-Prem"
        }
        else if(event.target.value === 2){
            setNextPage("/nodedetails")
            setTheHeading("AWS | OS")
            setNum(2)
            Context._currentValue.HostingProvider = "AWS"
        }
        else if(event.target.value === 3){
            setNextPage("/nodedetails")
            setTheHeading("Azure | OS")
            setNum(3)
            Context._currentValue.HostingProvider = "Azure"
        }
        else if(event.target.value === 4){
            setNextPage("/nodedetails")
            setTheHeading("GCP | OS")
            setNum(4)
            Context._currentValue.HostingProvider = "Google Cloud Platform"
        }
        else{
            setNum(5)
            setNextPage("/nodedetails")
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
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
                            <Grid item xs={12}>
                                <form onSubmit={onSubmit}>
                                    <h3>Hosting Provider</h3>
                                    <FormControl className={classes.dropDown}>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={open}
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            value={nodeType}
                                            onChange={handleChange}
                                            className={classes.dropDownInner}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={1}>On-Prem</MenuItem>
                                            <MenuItem value={2}>AWS</MenuItem>
                                            <MenuItem value={3}>Azure</MenuItem>
                                            <MenuItem value={4}>Google Cloud Platform</MenuItem>
                                            <MenuItem value={5}>Other</MenuItem>
                                        </Select>
                                    </FormControl>

                                    {num === 5 ? 
                                        <h3>Other</h3> 
                                    : null}

                                    {num === 5 ? 
                                        <TextField fullWidth type="text" className={classes.textField} 
                                        variant="filled" size="small" label="Other" onChange={event => setTheHeading(Context._currentValue.HostingProvider = event.target.value)} />
                                     : null}
                                    
                                    <Button fullWidth variant="contained" className={classes.button} type="submit" onClick={() => {
                                        history.push({
                                            pathname: nextPage,
                                            heading: theHeading,
                                            number: num,
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
