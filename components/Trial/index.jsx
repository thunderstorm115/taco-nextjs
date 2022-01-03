import React, { useState } from 'react';
import { TextField, Button, Paper, Grid, FormLabel, Checkbox, FormControlLabel } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import tacologonew from "../../../../obs-cocoa-react/src/assets/TACOF.png";
import { validateEmail, validatePass } from '__helpers__/helpers';
import { API } from "aws-amplify";
import Amplify, { Auth } from 'aws-amplify';
import { CompleteMessage } from 'components/TrialStages';
import Spinner from 'components/User/Spinner';
import axios from 'axios';
import moment from "moment";
import useStyles from "./useStylesTrial";
import config from "UserPoolAmplify";

export default () => {
    const history = useHistory();
    const classes = useStyles();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [companyName, setCompanyName] = React.useState('');
    const [companyRegNo, setCompanyRegNo] = React.useState('');
    const [companyVatNo, setCompanyVatNo] = React.useState('');
    const [os, setOS] = React.useState({
        windows: false,
        suse: false,
        redhat: false,
        ubuntu: false,
    });
    const [role, setRole] = React.useState({
        MSP: false,
        Infra: false,
        Compliance: false,
    });
    const [validForm, setValidForm] = React.useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [showComplete, setShowComplete] = useState(false);
    const [warningOS, setWarningOS] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    //const [role, setRole] = useState('');
    const [groups, setGroup] = useState('CompanyAdmin');
    const [alertEmailLBL, setAlertEmailLBL] = useState('');
    const [alertPasswordLBL, setAlertPasswordLBL] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');

    // TODO: the sign-up needs to be moved over to the last submit of the company flow.


    React.useEffect(() => {
        if (validateEmail(username)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
    }, [username]);

    React.useEffect(() => {
        if (validatePass(password)) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }
    }, [password]);

    React.useEffect(() => {
        if (username && password && companyName && validEmail && validPassword && (os.suse || os.ubuntu || os.redhat)) {
            
                 setValidForm(false);
            
        } else {
         
            setValidForm(true);
        
        }
    }, [username, password, companyName, companyRegNo, companyVatNo, os.suse, os.redhat, os.ubuntu, validEmail, validPassword])

    const handleChange = (event) => {
        setRole({ ...role, [event.target.name]: event.target.checked });
        setOS({ ...os, [event.target.name]: event.target.checked });
    };

    const onSubmit = async event => {
        event.preventDefault();
        // TODO: call signup method to sign up user.
        setLoading(true);
        let detailData = {
            email: username,
            company_name: companyName,
            reg_no: companyRegNo,
            vat_no: companyVatNo,
            radio_os: os
        }

        try {
            const response = await Auth.signUp({
                username,
                password,
                // Trial signup values
                attributes: {
                    //phone_number: "",
                    //name: company,
                    'custom:company_name': companyName,
                    'custom:company_key': companyName.toLowerCase().replace(/ /g, "_"),
                    'custom:company_email': companyEmail.toLowerCase().replace(/ /g, "_"),
                    //'custom:roles': "All",
                    'custom:roles': "true, false, false",
                    'custom:Trial': moment().format("DD-MM-YYYY hh:mm:ss"),
                    'profile': "CompanyAdmin",
                    //"custom:groups": admin,
                    //'custom:signup_details': `${company}, ${role}`
                    //family_name: role,
                    //middle_name:"none"
                    preferred_username: `${detailData.company_name},${detailData.reg_no},${detailData.vat_no},${detailData.radio_os["windows"]},${detailData.radio_os["suse"]},${detailData.radio_os["redhat"]},${detailData.radio_os["ubuntu"]}`,
                    //groups,
                }
            })
            setLoading(false);
            createJiraIssue(detailData);
            setShowComplete(true);
        } catch (e) {
            console.error("ERROR SIGNING UP", e);
            if (e.message === "PreSignUp failed with error Company already exists.") {
                setError("Company Already Exists")
            }
            else {
                setError(e.message);
            }

            setLoading(false);
        }
    };

    const createJiraIssue = async (jiraData) => {
        const details = {

            body:{

            project: {
                key: "TESTSALES"
            },
            summary: `${jiraData.company_name} Trial Signup by ${username}`,
            description: username,
            components: jiraData,
            issuetype: {
                name: "Lead"
            }
        }
    }

        try {
            const ApiData = config.APIDetails.endpoints[0];
            await API.post(
              ApiData.name,
              '/taco-jira-function',
              details
            );
            history.push('/trial/complete');
          } catch (e) {
            console.log(e)
          }
    };

    const handleOnchangeEmailValidation = async event => {
        if (validateEmail(event.target.value) || event.target.value == "") {
            setAlertEmailLBL(null);
        }
        else {
            setAlertEmailLBL("Email is not correct format");
        }
    };

    const handleOnchangePasswordValidation = async event => {
        if (validatePass(event.target.value) || event.target.value == "") {
            setAlertPasswordLBL(null);

        }
        else {
            setAlertPasswordLBL("Incorrect length or format");
        }
    };

    const handleCancel = async () => {
        try {
            history.push('/login');
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {showComplete && <CompleteMessage email={username} />}
            {loading && <Spinner />}
            <main className={classes.layout}>
                <img className="logo" src={tacologonew} alt="Obsidian logo" />
                <h1 className="loginTitle">Trial Sign-up</h1>
                <Paper className={classes.paper}>

                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                        className={classes.signUp}>
                        <Grid item xs={12}>

                            <form onSubmit={onSubmit}>
                                <h2 className="loginTitle4">User Details</h2>
                                <TextField fullWidth type="email" required className={classes.textField} variant="filled" size="small" value={username}
                                    onChange={event => handleOnchangeEmailValidation(event) && setUsername(event.target.value)}
                                    label="Email" />
                                <FormLabel className={classes.validation} component="legend">{alertEmailLBL}</FormLabel>

                                <TextField fullWidth type="password" required className={classes.textField} variant="filled" size="small" value={password}
                                    onChange={event => handleOnchangePasswordValidation(event) && setPassword(event.target.value)}
                                    label="Password" />
                                <FormLabel className={classes.validation} component="legend">{alertPasswordLBL}</FormLabel>

                                <h2 className="loginTitle4">Company Details</h2>
                                <TextField
                                    fullWidth
                                    className={classes.textField}
                                    variant="filled"
                                    size="small"
                                    value={companyName}
                                    required
                                    onChange={(event) => setCompanyName(event.target.value)}
                                    label="Company Name"
                                />

                                <TextField fullWidth
                                    onChange={e => setCompanyEmail(e.target.value)}
                                    value={companyEmail} required
                                    label="Company Email"
                                    className={classes.textField}
                                    variant="filled"
                                    size="small"
                                />

                                <TextField
                                    fullWidth
                                    className={classes.textField}
                                    variant="filled"
                                    size="small"
                                    value={companyRegNo}
                                    onChange={(event) => setCompanyRegNo(event.target.value)}
                                    label="Company Registration No."
                                />
                                <TextField
                                    fullWidth
                                    id="standard-error-helper-text"
                                    className={classes.textField}
                                    variant="filled"
                                    size="small"
                                    value={companyVatNo}
                                    onChange={(event) => setCompanyVatNo(event.target.value)}
                                    label="VAT No."
                                />
                                {/* 
                                <div>
                                    <FormControl className={classes.select}>
                                    <InputLabel htmlFor="grouped-native-select">Role Type.</InputLabel>
                                    <Select
                                        id="role"
                                        onChange={event => setRole(event.target.value)}
                                        label="Role Type"
                                        
                                    >
                                        <MenuItem value="Infra">Infrastructure</MenuItem> 
                                        <MenuItem value="Compliance">Compliance</MenuItem> 
                                        <MenuItem value="All">All</MenuItem> 
                                        
                                        <MenuItem className={classes.label2} value="Infrastructure">
                                            Infrastructure
                                         </MenuItem>
                                        <MenuItem className={classes.label2} value="Compliance">
                                            Compliance
                                         </MenuItem>
                                        <MenuItem className={classes.label2} value="All">
                                            All
                                        </MenuItem> 
                                    </Select>
                                    </FormControl>
                                </div> */}


                                <h2 className="loginTitle4">Select Operating Systems</h2>
                                {/* {!warningOS ? <p className={classes.warningOS}>Please select an operating system</p> : null} */}
                                <div>
                                    {/* <FormControlLabel
                                        className={classes.checkBox}
                                        control={
                                            <Checkbox
                                                className={classes.checkBox}
                                                checked={os.windows}
                                                onChange={handleChange}
                                                name="windows"
                                            />
                                        }
                                        label="Windows"
                                    /> */}
                                    <FormControlLabel
                                        className={classes.checkBox}
                                        control={
                                            <Checkbox
                                                className={classes.checkBox}
                                                checked={os.suse}
                                                onChange={handleChange}
                                                name="suse"
                                            />
                                        }
                                        label="SUSE"
                                    />
                                    <FormControlLabel
                                        className={classes.checkBox}
                                        control={
                                            <Checkbox
                                                className={classes.checkBox}
                                                checked={os.redhat}
                                                onChange={handleChange}
                                                name="redhat"
                                            />
                                        }
                                        label="Redhat"
                                    />
                                    <FormControlLabel
                                        className={classes.checkBox}
                                        control={
                                            <Checkbox
                                                className={classes.checkBox}
                                                checked={os.ubuntu}
                                                onChange={handleChange}
                                                name="ubuntu"
                                            />
                                        }
                                        label="Ubuntu"
                                    />
                                </div>

                                {/*<h2 className="loginTitle4">Select Roles</h2>
                                <div>
                                     <FormControlLabel
                                        className={classes.checkBox}
                                        control={
                                            <Checkbox
                                                className={classes.checkBox}
                                                checked={role.MSP}
                                                onChange={handleChange}
                                                name="MSP"
                                            />
                                        }
                                        label="MSP"
                                    />
                                    <FormControlLabel
                                        className={classes.checkBox}
                                        control={
                                            <Checkbox
                                                className={classes.checkBox}
                                                checked={role.Infra}
                                                onChange={handleChange}
                                                name="Infra"
                                            />
                                        }
                                        label="Infrastructure"
                                    />
                                    <FormControlLabel
                                        className={classes.checkBox}
                                        control={
                                            <Checkbox
                                                className={classes.checkBox}
                                                checked={role.Compliance}
                                                onChange={handleChange}
                                                name="Compliance"
                                            />
                                        }
                                        label="Compliance"
                                    /> 
                                </div>*/}
                                <div className={classes.error}>{error}</div>
                                <Button fullWidth variant="contained" className={classes.button} onClick={handleCancel}>CANCEL</Button>
                                <Button fullWidth variant="contained" disabled={validForm} className={classes.button2} type="submit">SUBMIT</Button>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </>
    );
}