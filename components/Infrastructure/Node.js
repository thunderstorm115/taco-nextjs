import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Auth, API } from "aws-amplify";
import config from "UserPoolAmplify";
import Spinner from "components/User/Spinner";
import useStyles from "./useStylesInfra";
import { useParams } from 'react-router-dom';

export default function Node({ nodeId, back }) {
  const classes = useStyles();
  const [finsihedDataLoad, setFinishedDataLoad] = useState(false)
  const [metadata, setMetaData] = useState()
  let { node } = useParams();
  let nodeDetails = node.split('_');

  useEffect(() => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: jwtToken
            }
          }
          API.get(ApiData.name, `/infra/node-details?node-id=${nodeDetails[1]}`, options)
            .then((res) => {
              setMetaData(res);
              setFinishedDataLoad(true)
         
            })
            .catch((error) => {
              console.log(error.response);
            })

        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <main>
      {finsihedDataLoad ?

        <Grid //Gloal grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.layout2}
        >
          <Grid //Card Grid
            container
            display="flex"
            alignItems="stretch"
            className={classes.graphTaskSort}>
            <Grid item xs={10} lg={12} className={classes.paperNode}>
                <div class="btn-group">
                  <h2 className="LoginTitle" align="center">Metadata</h2>
                  <div className="MetaData">
                    <h3 className={classes.heading}>Chef Organization</h3>
                    {metadata.organization === "" ? "None" : <p className={classes.nodeSingleData}>{metadata.organization}</p>}
                    <h3 className={classes.heading}>Chef Roles</h3>
                    {Array.isArray(metadata.roles) ? <p className={classes.nodeSingleData}>{metadata.roles.map((value, index) => (index !== metadata.roles.length - 1) ? value + ", " : value)}</p> : metadata.roles === "" ? "None" : <p>{metadata.roles}</p>}
                    <h3 className={classes.heading}>Chef Server</h3>
                    {metadata.chef_server === "" ? "None" : <p className={classes.nodeSingleData}>{metadata.chef_server}</p>}
                    <h3 className={classes.heading}>Chef Tags</h3>
                    <p className={classes.nodeSingleData}>{metadata.chef_tags.map((value, index) => (index !== metadata.chef_tags.length - 1) ? value + ", " : value)}</p>
                  </div>
                </div>
            </Grid>
          </Grid>
        </Grid>
        : <Spinner />}
    </main>
  );
}
