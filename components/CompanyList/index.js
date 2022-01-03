import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Spinner from "components/User/Spinner";
import { Auth, API } from 'aws-amplify';
import config from "UserPoolAmplify";
import useStyles from "./useStyleCompanyList";
import Styles from "components/CompanyList/CompanyListStyles.css";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TopToolbar from "components/DashboardPage/TopToolbar";

export default () => {
    const history = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [search, setSearchCompany] = useState("");
    const [companyMonitor, setCompanyMonitor] = useState([]);
    const [, setFinishLoad] = useState(false);

    const listCompanies = async(options) => {
      setLoading(loading);
      try {
        const ApiData = config.APIDetails.endpoints[0];
        const monitor = await API.get(
          ApiData.name,
          "/company-data",
          options
        );
       
        if(monitor.data !== undefined){
          setCompanyMonitor(monitor.data);
          setLoading(!loading);
        }
        else{
          setCompanyMonitor(monitor);
        }
      } catch (err) {
        console.log(err);
      }
  }

    useEffect(() => {
      (async () => {
        try {
          const user = await Auth.currentAuthenticatedUser();
          let jwtToken = user.signInUserSession.idToken.jwtToken;
          const options = {
            response: true,
            headers: {
              Authorization: jwtToken,
            },
          };
          await listCompanies(options)
        } catch (err) {
          console.log(err);
        }
      })();
    }, []);

    const chooseCompany = (company_name, companyID, option) => {
      setFinishLoad(false);
      (async () => {
        try {
          const ApiData = config.APIDetails.endpoints[0];
          const cognitoUser = await Auth.currentAuthenticatedUser();
          const currentSession = await Auth.currentSession();
          cognitoUser.refreshSession(
            currentSession.refreshToken,
            (err, session) => {
              const { idToken } = session;
              let jwtToken = idToken.jwtToken;
  
              const options = {
                body: {
                  "custom:company_name": company_name,
                  "custom:organization_name": companyID,
                },
                headers: {
                  Authorization: jwtToken,
                },
              };
              API.put(ApiData.name, `/users/cognito-update`, options)
                .then((res) => {})
                .catch((error) => {
                  console.log(error.response);
                })
                .finally(() => {
                  if (option === "selectCompany") {
                    history.push({
                      pathname: "/infrastructure/overview",
                      state: { detail: company_name },
                    });
                  } else {
                    history.push({
                      pathname: "/editcompany",
                      state: { detail: companyID, companyname: company_name },
                    });
                  }
                  setFinishLoad(false);
                });
            }
          );
        } catch (err) {
          console.log(err);
        }
      })();
    };    
 

    return loading ? (
      <Spinner />
    ) : (
      <div>
        <TopToolbar />
        <main className={classes.gridIndex}>
          <Grid>
            <h1 className={classes.title}>Company List</h1>
            <TextField
              className={classes.textField}
              type="search"
              value={search}
              onChange={(event) => setSearchCompany(event.target.value)}
              placeholder="Search"
              InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            />
          </Grid> 

          <Grid container
            direction="column"
            alignItems="center">
            {companyMonitor && companyMonitor.length ? (
                <Grid align="center">
                  <Table className={Styles} className={classes.table}>
                    <Thead className={classes.tableHead}>
                      <Tr>
                        <Th align="center" className={classes.tableContent}>Company Name</Th>
                        <Th align="center" className={classes.tableContent}></Th>
                      </Tr>
                    </Thead>
                    {companyMonitor
                    .filter((res) =>
                      res.company_name.toLowerCase().includes(
                        search.toLowerCase()
                      )
                    )
                    .map((res, index) => (
                    <Tbody className={classes.tableBody}>
                      <Tr>
                      <Td className={classes.tableContent}>{res.company_name}</Td>
                      <Td align="center" className={classes.tableContent}>
                          <Button className={classes.edtBtn}
                            variant="contained"
                            onClick={() => {
                            chooseCompany(
                              res.company_name,
                              res.companyID,
                              "editCompany"
                            );
                            }}>
                            Edit
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                    ))}
                  </Table>
                </Grid>
              ) : <h2 className={classes.title}>No Data</h2>}
            </Grid>
        </main>
      </div>
    );  
  };
  