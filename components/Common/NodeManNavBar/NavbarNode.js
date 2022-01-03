import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { Grid, Tab, Tabs, withStyles, Typography } from "@material-ui/core";
import { Auth, API } from "aws-amplify";
import { useLocation } from "react-router-dom";
import config from "UserPoolAmplify";
import useStyles from "./useStylesLogin";
import { TopBar } from "components/Common";
import { routeBarValues } from "__helpers__/helpers";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #E5E5E5",
  },
  indicator: {
    backgroundColor: "#E5E5E5",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    fontSize: "16px",
    textTransform: "none",
    color: "#D3D3D3",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#FFFFFF",
      opacity: 1,
    },
    "& .MuiTab-wrapper": {
      flexDirection: "row",
      justifyContent: "flex-start",
      paddingRight: "32px",
      margingRight: "24px",
    },

    "& .MuiTab-root": {
      padding: "0px 0px",
      overflow: "hidden",
      position: "relative",
      maxWidth: "264px",
      minWidth: "72px",
      boxsizing: "border-box",
      minheight: "48px",
      textalign: "center",
      flexshrink: 0,
      lineHeight: "1.75",
      whiteSpace: "normal",
      letterSpacing: "0.02857em,",
    },
    "&$selected": {
      color: "#FFFFFF",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#FFFFFF",
    },
    [theme.breakpoints.down(800 + theme.spacing(2) * 2)]: {
      fontSize: "13px",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

export default ({ children }) => {
  const classes = useStyles();
  const [, setCompany] = useState("");
  const [, setRoles] = useState("");
  const [, setAdmin] = useState("");
  const [, setCompanyMsp] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const location = useLocation();

  let { node } = useParams();
  let breadcrumbNameMap = {
    "/nodeManagement/addNodeTerms": "Add A Node",
    "/infrastructure/overview/compliance": "Compliance",
    "/infrastructure/overview/nodes": "Infrastructure",
    "/sla/overview": "Overview",
    "/infrastructure/overview/nodes/node": "Node",
    "/sla/overview/auth-users": "Authorised Users",
    "/sla/overview/jiraissues": "Jira Issues",
    "/monitoring/overview": "Overview",
    "/infrastructure/overview/compliance/NodeType": "Nodes",
    "/alerts/overview": "Overview",
    "/nodes/pending": "Node Management",
    "/reports/overview": "Reports",
  };

  if (node !== undefined) {
    let nodeDetails = node.split("_");
    let nodePath = `/infrastructure/overview/nodes/${node}`;

    breadcrumbNameMap[nodePath] = nodeDetails[0];
  }

  useEffect(() => {
    let userAdmin;
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
              headers: {
                Authorization: jwtToken,
              },
            };
            API.get(ApiData.name, `/users/cognito-retrieve`, options)
              .then((res) => {
                setCompany(res.company_name);
                setRoles(res.roles.split(","));
                setAdmin(res.profile);
                userAdmin = res.profile;

                if (
                  userAdmin === "GlobalAdmin" ||
                  userAdmin === "CompanyAdmin"
                ) {
                  Auth.currentUserPoolUser()
                    .then((data) => {
                      (async () => {
                        try {
                          const ApiData = config.APIDetails.endpoints[0];
                          const cognitoUser =
                            await Auth.currentAuthenticatedUser();
                          const currentSession = await Auth.currentSession();
                          cognitoUser.refreshSession(
                            currentSession.refreshToken,
                            (err, session) => {
                              const { idToken } = session;
                              let jwtToken = idToken.jwtToken;

                              const options = {
                                headers: {
                                  Authorization: jwtToken,
                                },
                              };
                              API.get(ApiData.name, `/company/list`, options)
                                .then((res) => {
                                  setCompanyMsp(res);
                                })
                                .catch((error) => {
                                  console.log(error.response);
                                })
                                .finally(() => {});
                            }
                          );
                        } catch (err) {
                          console.log(err);
                        }
                      })();
                    })
                    .catch((e) => {
                      console.error(e);
                    });
                }
              })
              .catch((error) => {
                console.log(error.response);
              });
          }
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, [location]);

  return (
    <div>
      <TopBar />
      <main className={classes.layoutOverview}>
        <h1 className={classes.heading3}>Node Management</h1>
        <Grid
          container
          display="flex"
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.graph}
        >
          <Grid className={classes.componentGridSizing}>
            <AntTabs
              value={activePage}
              aria-label="tabbed component"
              variant="scrollable"
              // indicatorColor="primary"
              scrollButtons="auto"
            >
              <NavButton
                config={{
                  label: "Node Configuration",
                  path: "/nodeManagement",
                }}
                className={classes.sizing}
                setActivePage={setActivePage}
              />
              <NavButton
                config={{
                  label: "Monitoring Services",
                  path: "/MonitoringServices",
                }}
                setActivePage={setActivePage}
              />
              <NavButton
                config={{
                  label: "Compliance Benchmarks",
                  path: "/ComplianceBenchmarks",
                }}
                setActivePage={setActivePage}
              />
              <NavButton
                config={{
                  label: "Pending Changes",
                  path: "/nodes/pending",
                }}
                setActivePage={setActivePage}
              />
            </AntTabs>
            <Typography className={classes.padding} />
          </Grid>
          {children}
        </Grid>
      </main>
    </div>
  );
};

const NavButton = ({ config, setActivePage }) => {
  const { label, path } = config;
  const history = useHistory();
  let match = useRouteMatch({
    path,
  });
  if (match) {
    setActivePage(routeBarValues(match.path));
  }

  const handleClick = () => {
    setActivePage();
    history.push(path);
  };

  return <AntTab label={label} onClick={handleClick} />;
};
