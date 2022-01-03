import React, { useState, useEffect } from 'react';
import { Grid, AppBar, Toolbar } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import finalLogo from "assets/TACOF.png";
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useStyles from "./useStylesDash";

export default function MenuListComposition() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const history = useHistory();
    const [userAdminRights, setUserAdminRights] = useState('');
    const [userCompanyKey, setUserCompanyKey] = useState('');
    const globalAdmin = "GlobalAdmin";
    const companyAdmin = "CompanyAdmin";

    const logout = async () => {
        try {
            await Auth.signOut();
            history.push('/login');
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    useEffect(() => {
        (Auth.currentUserPoolUser().then(data => {
            setUserCompanyKey(data.attributes["custom:organization_name"])
            setUserAdminRights(data.attributes["profile"])
        }))
            .catch(e => {
                console.error(e);
            })
    }, []);

    console.log(userAdminRights)

    return (
        <div className={classes.root1}>
            <AppBar position="static" className={classes.appBarTopTool}>
                <Toolbar>
                    <Grid edge="start" className={classes.IconTopTool} color="inherit">
                        <img onClick={() => { history.push("index#") }} className={classes.appBarLogoTopTool} src={finalLogo} alt="Obsidian logo" />
                    </Grid>

                    <h1 onClick={() => { history.push("index#") }} className={classes.titleTopTool}>Taco</h1>

                    <Grid className={classes.toggle}
                        container
                        display="flex"
                        justify="flex-end"
                        alignItems="flex-end">
                        {userAdminRights === globalAdmin ? 
                        <Button className={classes.navButton} href="index#">
                            Clients
                        </Button> :
                            null}

                        <Button
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            className={classes.navButton}
                        >
                            <AccountCircleIcon fontSize="large"></AccountCircleIcon>
                        </Button>

                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList className={classes.menu} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                {/* {(userAdminRights === globalAdmin || userAdminRights === companyAdmin) && userCompanyKey !== "none" ? <> */}
                                                {userAdminRights === globalAdmin ? <>   
                                                    <MenuItem onClick={() => history.push("/user")}>User Menu</MenuItem>
                                                    <MenuItem onClick={() => history.push("/companyList")}>Company List</MenuItem>
                                                </>: null}  
                                                <MenuItem onClick={() => history.push("/about")}>About</MenuItem>
                                                <MenuItem onClick={() => history.push("/settings")}>Settings</MenuItem>
                                                <MenuItem onClick={() => history.push("/support")}>Support</MenuItem>
                                                <MenuItem onClick={logout}>Logout</MenuItem>
                                                <MenuItem className={classes.version}>V0.95</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </Grid>

                </Toolbar>
            </AppBar>
        </div >
    )
}