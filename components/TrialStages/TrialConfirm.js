import React from 'react';
import {useHistory} from 'react-router-dom';
import withTrialProgress from 'hoc/withTrialProgress';
import { Button, Grid} from "@material-ui/core";
import {Context } from 'components/TrialSignup/trialStore';
import axios from 'axios';
import { API } from "aws-amplify";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStyles from './useStyles';

import Amplify, { Auth } from 'aws-amplify';
import config from "UserPoolAmplify";

const CompanyDetails = () => {
    const classes = useStyles();
    const history = useHistory();
    const [state, dispatch] = React.useContext(Context);
    const [error, setError] = React.useState("");
    const [opacity, setOpacity] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const submitDetails = async () => {
      setLoading(true);
      let detailData = {
        email: state.email,
        company_name: state.companyName,
        reg_no: state.companyRegNo,
        vat_no: state.companyVatNo,
        environment: state.hostingEnvironment,
        check_box: state.tcpCheck,
        radio_os: state.os,
        version: state.osVersion,
        ip_address: state.ipAddress,
        host_name: state.hostname,

        service_account: state.serviceAccount,
        tenant_id: state.tenantID,
        client_secret: state.clientSecret,
        service_type: state.serviceType,
        awsakid: state.awsAccessKeyId,
        awssak: state.awsSecreteAccessKey,
        tcp: state.tcpPort,
        winrm_username: state.winRMUsername,
        winrm_password: state.winRMPassword,
        ssh_username: state.SSHUsername,
        ssh_password: state.SSHPassword,
        public_key: state.publicKey,
        sudo_password: state.sudoPassword,
        sudo_options: state.sudoOptions,
        root_password: state.rootPassword,
      };
      signUpTrial(state.email, state.password, detailData)  
  }

  async function signUpTrial(username, password, detailData){
    try {
      const { user } = await Auth.signUp({
          username,
          password,
          // Trial signup values
             attributes: {
                 phone_number:"+15555555555",  
                 name:'none',
                 given_name:'Xcompany',
                 family_name:'none', 
             }
      });
   
      createJiraIssue(detailData);
  } catch (error) {
    setError(error);
    setOpacity(1);
  }
}
  
    const createJiraIssue = async (jiraData) => {
      const details = {
        body:
        {
        project: {
          key: "TESTSALES"
        },
        summary: `${jiraData.company_name} Trial Signup by ${state.email}`,
        description: state.email,
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

    const handleCancel = async () => {
      try {
        await dispatch({type: 'CLEAR_STATE'});
        history.push("/login");
      } catch(err) {
          console.error(err);
      }
    }
  

    return (
      <div>
      <Grid
            container
            direction="row"
            alignItems="center"
             >
            <Grid item sm={3} xs={2} className={classes.arrowSpace2}>
              <ArrowBackIosIcon fontSize="medium" onClick={() => history.goBack()}/>
            </Grid>
            <Grid item sm={9} xs={10}>
            <h4 className="detailHead3" align="center">{state.hostingEnvironment} | {state.os}</h4>
            </Grid>
          </Grid>

          
          <Grid
            container
            direction="column"
            alignItems="center"
             >
               <Grid item xs={12}>
      <h4 style={{ color: "white"}}>You are about to create a new admin user with the credentials provided. Do you want to signup?</h4>
      <h4 style={{ color: "red", opacity: opacity }}>{error}</h4>
</Grid>
      </Grid>
      <Grid
            container
            direction="row"
            alignItems="center"
            spacing={2}
             >
          <Grid item xs={6}>
          <Button fullWidth variant="contained" className={classes.button} type="submit"  onClick={handleCancel}>Cancel</Button>
          </Grid>
          <Grid item xs={6}>
    <Button fullWidth variant="contained" disabled={loading} className={classes.button1} onClick={submitDetails}> {loading ? 'loading...' : 'Submit'}</Button>
    </Grid>
    </Grid>
    </div>
    )

}
export default withTrialProgress(CompanyDetails);


