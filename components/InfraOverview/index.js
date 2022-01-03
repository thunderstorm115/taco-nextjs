import React, {useEffect, useState} from "react";
import { Grid} from "@material-ui/core";
import SummarySmall from "components/InfraOverview/SummarySmall";
import SummaryCompliance from "./SummaryCompliance";
import { Auth } from 'aws-amplify';
import Spinner from "components/User/Spinner";
import useStyles from "./useStylesInfraOver";
import config from "UserPoolAmplify";
import { API } from 'aws-amplify';

export default (props) => {
  const classes = useStyles();
  const [roles, setRoles] = useState("");
  const [Loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState("");

  const [total, setTotal] = useState(0);
  const [success, setSucess] = useState(0);
  const [missing, setMissing] = useState(0);
  const [failed, setFailed] = useState(0);

  const [Comptotal, CompsetTotal] = useState(0);
  const [Compsuccess, CompsetSucess] = useState(0);
  const [Compskipped, CompsetSkipped] = useState(0);
  const [Compfailed, CompsetFailed] = useState(0);
  const [Compwaived, CompsetWaived] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0]
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
        const { idToken } = session;

        let jwtToken = idToken.jwtToken;
        
          const options = {
            response: true,
            headers: {
              Authorization: jwtToken
            }
          }

          API.get(ApiData.name, `/users/cognito-retrieve`, options).then(res => {
           setRoles(res.roles.split(","));
           setAdmin(res.profile)
           setLoading(false)
          }).catch(error => {
            console.log(error.response)
          })

          API.get(ApiData.name, '/infra/summary', options).then(res => {
          
            setSucess(res.data.Data.success);
            setFailed(res.data.Data.failure);
            setMissing(res.data.Data.missing);
            setTotal(
              res.data.Data.success +
              res.data.Data.failure +
              res.data.Data.missing
            );
             CompsetTotal(res.data.company.control_summary_totals.total);
             CompsetFailed(res.data.company.control_summary_totals.failed.total);
            CompsetSucess(res.data.company.control_summary_totals.passed.total);
            CompsetWaived(res.data.company.control_summary_totals.waived.total);
            CompsetSkipped(res.data.company.control_summary_totals.skipped.total);
            setLoading(false)
          }).finally(() => setLoading(false))
        });
      } catch (err) {
        console.log(err);
      }
    })();
}, []);

  return (
    <div>
      <main>
            {Loading ? <Spinner/>:
              <Grid
                  container     
                  className={classes.graph}
                >

                {roles[2] === "true" || admin !== "User" ? 
                  <Grid item xs={12} md={12} lg={6}>
                      <SummaryCompliance total={Comptotal} success={Compsuccess} failed={Compfailed} waived={Compwaived} skipped={Compskipped} />
                  </Grid>
                :null} 
                
                {roles[1] === "true" || admin !== "User" ?
                  <Grid item xs={12} md={12} lg={6}>
                    <SummarySmall total={total} success={success} missing={missing} failed={failed} />
                  </Grid>
                : null}
              </Grid>   
            }
      </main>
    </div> 
  );
};
