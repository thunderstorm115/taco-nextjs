import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { Grid, Tab, Tabs, withStyles, Typography } from "@material-ui/core";
import { Auth, API } from 'aws-amplify';
import { useLocation } from "react-router-dom";
import config from "UserPoolAmplify";
import useStyles from "./useStylesLogin";
import { TopBarAdmin } from 'components/Common';
import { routeBarValues } from '__helpers__/helpers';

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
        color: "#D3D3D3",    
        fontSize: "16px",
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

        '& .MuiTab-wrapper': {
            flexDirection: "row",
            justifyContent: "flex-start"
        },

        '& .MuiTab-root': {
            padding: "0px",
            overflow: "hidden",
            position: "relative",
            maxWidth: "200px",
            minWidth: "70px",
            boxsizing: "border-box",
            minheight: "48px",
            textalign: "center",
            flexshrink: 0,
            lineHeight: "1.75",
            whiteSpace: "normal",
            letterSpacing: "0.02857em,"
        },

        '&$selected': {
            color: '#FFFFFF',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#FFFFFF',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

export default ({ children }) => {
    const classes = useStyles();
    const [setCompany] = useState("");
    const [setRoles] = useState("");
    const [setAdmin] = useState("");
    const [activePage, setActivePage] = useState(0);
    const location = useLocation();
    let { node } = useParams();
    let breadcrumbNameMap = {
        '/infrastructure/overview': 'Overview',
        '/infrastructure/overview/compliance': 'Compliance',
        '/infrastructure/overview/nodes': 'Infrastructure',
        '/sla/overview/pdfsSla': 'PDFs',
        '/infrastructure/overview/nodes/node': 'Node',
        '/sla/overview/auth-users': 'Authorised Users',
        '/sla/overview/': 'Authorised Users',
        '/sla/overview/jiraissues': 'Jira Issues',
        '/monitoring/overview': 'Overview',
        '/infrastructure/overview/compliance/NodeType': 'Nodes',
        '/reports/overview': 'Reports',
        '/alerts/overview': 'Overview',
     
    };

    if (node !== undefined) {
        let nodeDetails = node.split('_');
        let nodePath = `/infrastructure/overview/nodes/${node}`;

        breadcrumbNameMap[nodePath] = nodeDetails[0];
    }

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

                        if (userAdmin === "GlobalAdmin") {
                            (Auth.currentUserPoolUser().then(data => {
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
                                            API.get(ApiData.name, `/company/list`, options).then(res => {
                                            }).catch(error => {
                                                console.log(error.response)
                                            }).finally(() => { })
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
    }, [location, setAdmin, setCompany, setRoles]);

    return (
        <div>
            <TopBarAdmin />
            <main className={classes.layoutOverview}>

                <h1 className={classes.heading3}>Clients</h1>
                <Grid
                    container
                    display="flex"
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.graph}
                >
                    <Grid className={classes.componentGridSizing}>
                        <AntTabs value={activePage}
                            aria-label="tabbed component"
                            >
                                
                            <NavButton
                                config={{
                                    label: "Overview",
                                    path: "/dashboard"
                                }}
                                setActivePage={setActivePage}
                            />

                            <NavButton 
                                config={{
                                    label: "SLA",
                                    path: "/dashboard/SLA"
                                }}
                                setActivePage={setActivePage}
                            />

                            <NavButton
                                config={{
                                    label: "Alerts",
                                    path: "/dashboard/Alerts"
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
        path
    });

    if (match) {
        setActivePage(routeBarValues(match.path));
    }

    const handleClick = () => {
        setActivePage();
        history.push(path);
    }

    return (
        <AntTab label={label} onClick={handleClick}/>
            )}



