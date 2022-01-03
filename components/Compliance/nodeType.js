import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { Auth, API } from "aws-amplify";
import config from "UserPoolAmplify";
import Spinner from "components/User/Spinner";
import useStyles from "./useStylesComp";
import { Grid } from "@material-ui/core";

export default function NodeType() {
    const classes = useStyles();
    const [finsihedDataLoad, setFinishedDataLoad] = useState(true)
    const [metadata, setMetaData] = useState()

    useEffect(() => {
        (async () => {
            try {
              const ApiData = config.APIDetails.endpoints[0];
              const user = await Auth.currentAuthenticatedUser();
      
              let jwtToken = user.signInUserSession.idToken.jwtToken;
              const options = {
                response: true,
                headers: {
                  Authorization: jwtToken,
                },
              };
      
              const nodeType = await API.get(ApiData.name, `/infra/nodes`, options);
              setMetaData(nodeType.data);
              
              
      
            } catch (err) {
              console.log(err);
            } finally{setFinishedDataLoad(false);}
          })();    
    }, []);

    function date(theDate) {
        let mainDate = theDate.slice(0, 10)
        let time = theDate.slice(11, 19)
        return mainDate + " - " + time
    }

    return (
        <main>
            {finsihedDataLoad ? <Spinner /> :
                <Grid
                container
                display="flex"
                flexWrap="wrap"
                alignItems="center">
                    <Grid container>
                        {metadata.map(item => (
                                    <Paper className={classes.paperNode}>
                                            <h3 className="LoginTitle" align="center">{item.name}</h3>
                                            <h4 align="left" className={classes.nodeDate}>{date(item.checkin)}</h4>
                                            <div className="MetaData">
                                                <h3 className={classes.nodesHeading}>{item.platfrom}</h3>
                                                <h3 className={classes.nodesHeading}>Chef Infra Client Version</h3>
                                                <p className={classes.items}>{item.chef_version}</p>

                                                <h3 className={classes.nodesHeading}>FQDN</h3>
                                                <p className={classes.items}>{item.fqdn}</p>

                                                <h3 className={classes.nodesHeading}>IP Address</h3>
                                                <p className={classes.items}>{item.ipaddress}</p>

                                                <h3 className={classes.nodesHeading }>Platfrom</h3>
                                                <p className={classes.items}>{item.platform}</p>
                                            </div>
                                    </Paper>
                        ))}
                    </Grid>
                </Grid>}
        </main >
    );
}
