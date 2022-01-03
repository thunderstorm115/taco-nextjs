import React, { useState, useEffect, useContext } from "react";
import Summary from "./Summary";
import { AccountContext } from "components/LoginPage/Accounts";
import NodeList from "./NodeList";
import Spinner from "components/User/Spinner";
import { Auth, API } from "aws-amplify";
import config from "UserPoolAmplify";
import useStyles from "./useStylesInfra";
 
export default (props) => {
  
  const { getSession } = useContext(AccountContext);
  const classes = useStyles();
  const [data, setData] = useState();
  const [total, setTotal] = useState(1);
  const [setShowSummary] = useState(true);
  const [next, ] = useState({ id: '"0"' });
  const [ ,setLoading] = useState(false);

  const backToSummary = (e) => {
    setShowSummary(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const ApiData = config.APIDetails.endpoints[0];

        Auth.currentAuthenticatedUser().then((user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            response: true,
            headers: {
              Authorization: jwtToken,
            },
            body: next,
          };
          API.get(ApiData.name, "/infra/nodes", options)
            .then((res) => {
              if (data) {
                setData(data);
              } else setData(res.data);
              
            })
            .catch((error) => {
              console.log(error.response);
            })
            .finally(() => setLoading(true));
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [data, getSession, next]);

  return (
    <div>
      <main className={classes.layout}>
        <Summary setInfraTotal={setTotal} />

        {data ? (
          <div className={classes.NodeList}>
              <NodeList
                data={data}
                back={backToSummary}
                // fetchData={fetchdata}
                total={total}
                click={props.click}
              /> 
          </div>
        ) : (
            <Spinner />
          )}

      </main>
    </div>
  );
};
