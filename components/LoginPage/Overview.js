import React, {useEffect, useState} from "react";
import { Grid, Tab, Tabs, withStyles, Typography, Breadcrumbs} from "@material-ui/core";
import TopToolbar from "components/DashboardPage/TopToolbar";
import SLA from "components/LoginPage/SLA";
import InfrastructureCompliance from "components/InfraOverview/index";
import AuthorisedContacts from "components/AuthurisedUsers/AuthirisedUsers";
import IssueDetails from "components/Issue/JiraIssues";
import Monitoring from "components/Monitoring/Monitoring";
import Compliance from "components/Compliance/index";
import Infrastucture from "components/Infrastructure/index";
import Node from "components/Infrastructure/Node";
import { Auth, API } from 'aws-amplify';
import { useLocation } from "react-router-dom";
import config from "UserPoolAmplify";
import useStyles from "./useStylesLogin";

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #E5E5E5',
  },
  indicator: {
    backgroundColor: '#E5E5E5',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color:"#D3D3D3",
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#FFFFFF',
      opacity: 1,
    },
    '&$selected': {
      color: '#FFFFFF',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#FFFFFF',
    },
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      fontSize:"13px",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

export default () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [page, setPage] = React.useState(<SLA/>);
    const [breadcrumbs, setBreadCrumbs] = useState([]);
    const [company, setCompany ] = useState("");
    const [roles, setRoles] = useState("");
    const [admin, setAdmin] = useState("");
    const [companyMsp, setCompanyMsp] = useState(false);
    const location = useLocation();

    useEffect(() => {
          let userAdmin;
          (async () => {
            try {
              const ApiData = config.APIDetails.endpoints[0]
              const cognitoUser = await Auth.currentAuthenticatedUser();
              const currentSession = await Auth.currentSession();
              cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
              const { idToken } = session;
              let jwtToken = idToken.jwtToken;
                const options = {
                  headers: {
                    Authorization: jwtToken
                  }
                }
                API.get(ApiData.name, `/users/cognito-retrieve`, options).then(res => {
                 setCompany(res.company_name)
                 setRoles(res.roles.split(","))
                 setAdmin(res.profile)
                 userAdmin = res.profile

                 if(userAdmin === "GlobalAdmin"){
                  (Auth.currentUserPoolUser().then(data =>{
                      (async () => {
                          try {
                            const ApiData = config.APIDetails.endpoints[0]
                            const cognitoUser = await Auth.currentAuthenticatedUser();
                            const currentSession = await Auth.currentSession();
                            cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
                            const { idToken  } = session;

                            let jwtToken = idToken.jwtToken;

                              const options = {
                                headers: {
                                  Authorization: jwtToken
                                }
                              }
                              API.get(ApiData.name, `/company/list`, options).then(res => {
                                setCompanyMsp(res)
                              }).catch(error => {
                                console.log(error.response)
                              }).finally(() => {})

                            });
                          } catch (err) {
                            console.log(err);
                          }
                        })();
                    }))
                    .catch(e => {
                              console.error(e);
                            })
                          }

                }).catch(error => {
                  console.log(error.response)
                })

              });
            } catch (err) {
              console.log(err);
            }

          })();
    }, [location]);


    const subPageHandler = (newValue, nodes, selectedNode) => {
      if(window.innerWidth > 600)
      {
        if(newValue===3){
          setPage(<AuthorisedContacts/>);
          setBreadCrumbs(breadcrumbs => [...breadcrumbs, <Typography key={3} className={classes.linkStyle}>Authorised Contacts</Typography>]);
        }
        if(newValue===4){
          setPage(<IssueDetails/>);
          setBreadCrumbs(breadcrumbs => [...breadcrumbs, <Typography key={4} className={classes.linkStyle}>Issue Details</Typography>]);
        }
        if(newValue===5){
          setPage(<Compliance/>);
          setBreadCrumbs(breadcrumbs => [...breadcrumbs, <Typography key={5} className={classes.linkStyle}>Compliance</Typography>]);
        }
        if(newValue===6){
          setPage(<Infrastucture click={subPageHandler}/>);
          setBreadCrumbs(breadcrumbs => [...breadcrumbs, <Typography key={6} onClick={()=>{breadcrumbHandler(2)}} className={classes.linkStyle}>Infrastructure</Typography>]);
        }
        if(newValue===7){
          setPage(<Node nodeId={selectedNode["id"]}/>);
          setBreadCrumbs(breadcrumbs => [...breadcrumbs, <Typography key={7} className={classes.linkStyle}>{selectedNode["name"]}</Typography>]);
        }
      }
      else{
        if(newValue===3){
          setPage(<AuthorisedContacts/>);
          setBreadCrumbs(breadcrumbs => [...breadcrumbs, <Typography key={3} onClick={()=>{breadcrumbHandler(1)}} className={classes.linkStyle}><i className={classes.arrow}></i>Authorised Contacts</Typography>]);
        }
        if(newValue===4){
          setPage(<IssueDetails/>);
          setBreadCrumbs(breadcrumbs => [...breadcrumbs, <Typography key={4} onClick={()=>{breadcrumbHandler(1)}} className={classes.linkStyle}><i className={classes.arrow}></i>Issue Details</Typography>]);
        }
        if(newValue===5){
          setPage(<Compliance/>);
          setBreadCrumbs(breadcrumbs => [...breadcrumbs, <Typography key={5} onClick={()=>{breadcrumbHandler(0)}} className={classes.linkStyle}><i className={classes.arrow}></i>Compliance</Typography>]);
        }
        if(newValue===6){
          setPage(<Infrastucture click={subPageHandler}/>);
          setBreadCrumbs(breadcrumbs => [...breadcrumbs, <Typography key={6} onClick={()=>{breadcrumbHandler(0)}} className={classes.linkStyle}><i className={classes.arrow}></i>Infrastructure</Typography>]);
        }
        if(newValue===7){
          setPage(<Node nodeId={selectedNode["id"]}/>);
          setBreadCrumbs(breadcrumbs => [...breadcrumbs, <Typography key={7} onClick={()=>{breadcrumbHandler(2)}} className={classes.linkStyle}><i className={classes.arrow}></i>{selectedNode["name"]}</Typography>]);
        }
      }
    }

    const pageHandler = (event, newValue) => {
      if((roles[0] !== "All" || roles[0] === "false" ) && (admin !== "GlobalAdmin" ))
      {
        if(newValue===0){
        setPage(<InfrastructureCompliance click={subPageHandler}/>);
        setBreadCrumbs(breadcrumbs => [<Typography key={0} onClick={()=>{breadcrumbHandler(0)}} className={classes.linkStyle}>Overview</Typography>]);
        }
      }
      if(newValue===1){
        setPage(<SLA click={subPageHandler}/>);
        setBreadCrumbs(breadcrumbs => [<Typography key={1} onClick={()=>{breadcrumbHandler(1)}} className={classes.linkStyle}>Overview</Typography>]);
      }
      if(newValue===2){
        setPage(<Monitoring/>);
        setBreadCrumbs(breadcrumbs => []);
      }else{

          if(newValue===0){
            setPage(<InfrastructureCompliance click={subPageHandler}/>);
            setBreadCrumbs(breadcrumbs => [<Typography key={0} onClick={()=>{breadcrumbHandler(0)}} className={classes.linkStyle}>Overview</Typography>]);
          }
          if(newValue===1){
            setPage(<SLA click={subPageHandler}/>);
            setBreadCrumbs(breadcrumbs => [<Typography key={1} onClick={()=>{breadcrumbHandler(1)}} className={classes.linkStyle}>Overview</Typography>]);
          }
          if(newValue===2){
            setPage(<Monitoring/>);
            setBreadCrumbs(breadcrumbs => []);
          }
      }
      setValue(newValue);
    }

    const breadcrumbHandler = (number) => {

      if(number===0)
      {
        setPage(<InfrastructureCompliance click={subPageHandler}/>);
        setBreadCrumbs(breadcrumbs => [<Typography key={0} onClick={()=>{breadcrumbHandler(0)}} className={classes.linkStyle}>Overview</Typography>]);
      }
      if(number===1)
      {
        setPage(<SLA click={subPageHandler}/>);
        setBreadCrumbs(breadcrumbs => [<Typography key={1} onClick={()=>{breadcrumbHandler(1)}} className={classes.linkStyle}>Overview</Typography>]);
      }
      if(number===2)
      {
        setPage(<Infrastucture click={subPageHandler}/>);
        setBreadCrumbs(breadcrumbs => breadcrumbs.slice(0,-1));
      }
    }

  useEffect(() => {
      setPage(<InfrastructureCompliance click={subPageHandler}/>);
      setBreadCrumbs(breadcrumbs => [<Typography key={0} onClick={()=>{breadcrumbHandler(0)}} className={classes.linkStyle}>Overview</Typography>]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div>
    <TopToolbar/>
      <main className={classes.layoutOverview}>
      <h1 className={classes.heading3}>{company}</h1>
        <Grid
            container
            display="flex"
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.graph}
          >
                  <Grid className={classes.componentGridSizing}>
                  <AntTabs value={value} onChange={pageHandler} aria-label="tabbed component">
                      <AntTab label="Infrastucture" />

                      {(roles[0] === "true" || admin === "GlobalAdmin") && companyMsp ? <AntTab label="SLA"/> : null}
                      {(roles[0] === "true" && admin !== "GlobalAdmin") ? <AntTab label="SLA"/> : null}
                      {/* {roles[0] === "All" && admin !== "GlobalAdmin" ? <AntTab label="SLA"/> :null} */}

                      {(roles[0] === "true" || admin === "GlobalAdmin") && companyMsp ? <AntTab label="Monitoring"/> : null }
                      {(roles[0] === "true" && admin !== "GlobalAdmin") ? <AntTab label="Monitoring"/> : null }
                      {/* {roles[0] === "All" && admin !== "GlobalAdmin" ? <AntTab label="Monitoring"/> :null} */}

                  </AntTabs>
                  <Typography className={classes.padding} />
                  </Grid>

              <Grid className={classes.componentGridSizing}>
                {window.innerWidth > 600 ?

                    <Breadcrumbs separator="›" aria-label="breadcrumb" className={classes.breadcrumbStyle}>
                      {breadcrumbs}
                    </Breadcrumbs>
                  :
                  <Breadcrumbs separator="›" aria-label="breadcrumb" className={classes.breadcrumbStyle}>
                      {breadcrumbs[breadcrumbs.length -1]}
                    </Breadcrumbs>}
              </Grid>
                  {page}
        </Grid>
        </main>
    </div>
  );
};
