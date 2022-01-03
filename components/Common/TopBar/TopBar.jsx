import React, { useState, useEffect,useLayoutEffect } from 'react';
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
import Menu from '@material-ui/core/Menu';

export default function MenuListComposition() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const history = useHistory();
    const [userAdminRights, setUserAdminRights] = useState('');
    const [userCompanyKey, setUserCompanyKey] = useState('');
    const globalAdmin = "GlobalAdmin";
    const companyAdmin = "CompanyAdmin";
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [size, setSize] = useState([0, 0]);

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
    
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
    
    return (
        <div className={classes.root1}>
            <AppBar position="static" className={classes.appBarTopTool}>
                <Toolbar>
                    <Grid edge="start" className={classes.IconTopTool} color="inherit">
                        <img onClick={() => { history.push("/dashboard") }} className={classes.appBarLogoTopTool} src={finalLogo} alt="Obsidian logo" />
                    </Grid>

                    <h1 onClick={() => { history.push("/dashboard") }} className={classes.titleTopTool}>Taco</h1>

                    <Grid className={classes.toggle}
                        container
                        display="flex"
                        justify="flex-end"
                        alignItems="flex-end">
                       {size[0] > 766 ? (
                        userAdminRights === globalAdmin || userAdminRights === companyAdmin ? (
                        <div>
                        <Button
                            className={classes.navButton}
                            onClick={() => history.push("/nodeManagement")}
                        >
                            Node Management
                        </Button>
                        {userAdminRights === globalAdmin ?  
                        <Button
                            className={classes.navButton}
                            href="index#"
                        >
                            Clients
                        </Button>
                        : null} 
                        </div>
                        ):
                            null)
                        : ( userAdminRights === globalAdmin || userAdminRights === companyAdmin ?  (         
                        <div>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick} className={classes.navButton}>
                                Menu
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                
                            >
                                <MenuItem onClick={() => history.push("/nodeManagement")}>Node Management</MenuItem>
                                {userAdminRights === globalAdmin ?<MenuItem onClick={() => history.push("/dashboard")}>Clients</MenuItem>: null}
                            </Menu>
                        </div>):
                            null
                        )
                        }
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
                                                {/* {(userAdminRights === globalAdmin || userAdminRights === companyAdmin) && userCompanyKey !== "none" ? <>
                                                    <MenuItem onClick={() => history.push("/user")}>User Menu</MenuItem>
                                                    <MenuItem onClick={() => history.push("/companyList")}>Company List</MenuItem>
                                                </>: null}     */}
                                                {userAdminRights === globalAdmin ? <>   
                                                    <MenuItem onClick={() => history.push("/user")}>User Menu</MenuItem>
                                                    <MenuItem onClick={() => history.push("/companyList")}>Company List</MenuItem>
                                                </>: null} 
                                                <MenuItem onClick={() => history.push("/about")}>About</MenuItem>
                                                <MenuItem onClick={() => history.push("/settings")}>Settings</MenuItem>
                                                <MenuItem onClick={() => history.push("/support")}>Support</MenuItem>
                                                <MenuItem onClick={logout}>Logout</MenuItem>
                                                <MenuItem className={classes.version}>V1.00 </MenuItem>
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