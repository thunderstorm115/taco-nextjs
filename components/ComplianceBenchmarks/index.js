import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./useStylesComplianceBenchmarks";
import Spinner from "components/User/Spinner";
import { API } from 'aws-amplify';
import config from "UserPoolAmplify";
import { Auth } from 'aws-amplify';
import { Grid } from "@material-ui/core";
import BuildIcon from '@material-ui/icons/Build';
import EditIcon from '@material-ui/icons/Edit';

export default () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [ ,setCompany] = useState();
  const history = useHistory();

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
      <div>
        <main>
          <Grid className={classes.indexMain}>
            <Grid className={classes.SetUpCompliance} onClick={()=>history.push("/ComplianceBenchmarks/SetUpCompliance")}>
              <BuildIcon className={classes.Icon} />
              <h1 className={classes.Label}>Set Up Compliance Frameworks</h1>
            </Grid>
            <Grid className={classes.EditCompliance} onClick={()=>history.push("/ComplianceBenchmarks/EditCompliance")}>
              <EditIcon className={classes.Icon}/>
              <h1 className={classes.Label}>Edit Configured Compliance</h1>
            </Grid>
          </Grid>
        </main>
      </div>
  );
};
